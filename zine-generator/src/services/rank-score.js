import process from 'node:process';
import axios from 'axios';
import lodash from 'lodash';
import {server, rankRules} from '../config/index.js';
import validation from '../helpers/validation.js';
import * as versions from '../helpers/versions.js';
import cache from '../helpers/cache.js';

const PHONE_BASE_URL = process.env.PHONE_BASE_URL ?? 'http://localhost:' + server.port;

export default async function compare(req, res) {
	validate(req.body);

	const ranking = req.body.ranking;
	const itemScoreList = await getPhoneScoreList(req.body.items);
	const rankScale = await generateScoreScale(ranking, itemScoreList);
	await scoreAndSortPhones(itemScoreList, rankScale);
	res.set('cache-control', 'public, max-age=2419200').send({
		best: itemScoreList[0],
		results: itemScoreList,
	});
}

async function scoreAndSortPhones(itemScoreList, rankScale) {
	const promises = [];
	for (const itemScore of itemScoreList) {
		promises.push(getFinalScore(rankScale, itemScore));
	}

	await Promise.all(promises);

	itemScoreList.sort((alpha, beta) => beta.score - alpha.score);
}

function validate(body) {
	validation(body, {
		items: {presence: false, type: 'array'},
		ranking: {presence: true, type: 'array'},
	});
	if (body.items) {
		for (const item of body.items) {
			validation(item, {
				manufacturer: {presence: true, type: 'string'},
				model: {presence: true, type: 'string'},
			});
		}
	}

	for (const item of body.ranking) {
		validation(
			{item},
			{
				item: {
					presence: true,
					type: 'string',
					inclusion: Object.keys(rankRules),
				},
			},
		);
	}
}

async function getPhoneScoreList(items) {
	let itemList = items;
	if (!itemList) {
		itemList = cache.get('/v1/items');
		if (!itemList) {
			const res = await axios.get(PHONE_BASE_URL + '/v1/items');
			itemList = res.data;
			const ttl = res.headers['cache-control'] ? res.headers['cache-control'].match(/max-age=(\d+)/i)[1] : 600;
			cache.set('/v1/items', itemList, ttl);
		}
	}

	const promises = [];
	for (const item of itemList) {
		promises.push(getPhoneScore(item));
	}

	return Promise.all(promises);
}

/**
 * Generates an object that describes how each ranked property should be scored on a scale.
 * For example, if the min height in the item list is 130 and the max height is 150, then for
 * each mm, it would be equal to X points. If the min height is 140 and the max is 145, then
 * each mm is worth Y points, where Y > X.
 */
async function generateScoreScale(rankList, itemScoreList) {
	const scales = {};

	for (const rank of rankList) {
		scales[rank] = initScoreScaleForRank(rank, rankRules[rank], itemScoreList);
	}

	let i = rankList.length;
	for (const rank of rankList) {
		populateScoreScaleForRank(scales[rank], 2 ** i--, rankRules[rank]);
	}

	return scales;
}

async function getPhoneScore(item) {
	const url =
		'/v1/items/' +
		(item.href ?? 'manufacturers/' + item.manufacturer.toLowerCase() + '/models/' + item.model.toLowerCase());
	let data = cache.get(url);
	if (!data) {
		const res = await axios.get(PHONE_BASE_URL + url);
		data = res.data;
		const ttl = res.headers['cache-control'] ? res.headers['cache-control'].match(/max-age=(\d+)/i)[1] : 600;
		cache.set(url, data, ttl);
	}

	return {href: url, item: data};
}

function scoreNumber(value, rankRule, rankScale) {
	if (rankRule.scoreMethod === 'PREFER_LOW') {
		return (rankScale.values.max - value) * rankScale.multiplier;
	}

	if (rankRule.scoreMethod === 'PREFER_HIGH') {
		return (value - rankScale.values.min) * rankScale.multiplier;
	}

	return 0;
}

function scoreBoolean(value, rankRule, rankScale) {
	if (value && rankRule.scoreMethod === 'PREFER_TRUE') {
		return rankScale.multiplier;
	}

	return 0;
}

function scoreVersion(value, rankRule, rankScale) {
	const version = versions.getVersionObject(value);
	const semantic = rankScale.semantic;
	if (version[semantic] && rankRule.scoreMethod === 'PREFER_HIGH') {
		return (version[semantic] - rankScale[semantic].min) * rankScale.multiplier;
	}

	return 0;
}

async function getFinalScore(rankScale, itemScore) {
	itemScore.scoreBreakdown = {};
	itemScore.score = 0;
	for (const rank in rankScale) {
		const value = lodash.get(itemScore.item, rank);
		let score = 0;
		switch (rankRules[rank].type) {
			case 'number':
				score = scoreNumber(value, rankRules[rank], rankScale[rank]);
				break;

			case 'boolean':
				score = scoreBoolean(value, rankRules[rank], rankScale[rank]);
				break;

			case 'version':
				score = scoreVersion(value, rankRules[rank], rankScale[rank]);
				break;

			default:
				console.error('Invalid type configured: rank=', rank, 'type=', rankRules[rank].type);
		}

		itemScore.scoreBreakdown[rank] = score;
		itemScore.score += score;
	}

	delete itemScore.item;
}

function initScoreScaleForRank(rank, rankRule, itemScoreList) {
	const result = {};
	const mapValues = {};
	switch (rankRule.type) {
		case 'number':
			mapValues.values = [];
			break;
		case 'version':
			mapValues.major = [];
			mapValues.minor = [];
			mapValues.patch = [];
			break;
		default:
			// Skip any types that don't need counting
			return result;
	}

	for (const itemScore of itemScoreList) {
		const value = lodash.get(itemScore.item, rank);

		if (value) {
			let version;
			switch (rankRule.type) {
				case 'number':
					mapValues.values.push(value);
					break;
				case 'version':
					version = versions.getVersionObject(value);
					if (version?.major) mapValues.major.push(version.major);
					if (version?.minor) mapValues.minor.push(version.minor);
					if (version?.patch) mapValues.patch.push(version.patch);
					break;
				default:
				// Should never get here
			}
		}
	}

	for (const item of Object.keys(mapValues)) {
		result[item] = {};
		result[item].max = Math.max(...mapValues[item]);
		result[item].min = Math.min(...mapValues[item]);
	}

	return result;
}

function populateScoreScaleForRank(scoreScale, maxPoints, rankRule) {
	let temporarySemantic;
	let semantic = 'major';
	switch (rankRule.type) {
		case 'number':
			scoreScale.multiplier = maxPoints / (scoreScale.values.max - scoreScale.values.min);
			break;
		case 'version':
			for (temporarySemantic of ['major', 'minor', 'patch']) {
				if (scoreScale[temporarySemantic]?.max !== scoreScale[temporarySemantic]?.min) {
					semantic = temporarySemantic;
					break;
				}
			}

			scoreScale.semantic = semantic;
			scoreScale.multiplier = maxPoints / (scoreScale[semantic].max - scoreScale[semantic].min);
			break;
		default:
			scoreScale.multiplier = maxPoints;
	}
}
