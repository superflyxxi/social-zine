import lodash from 'lodash';
import {getVersionObject} from '@superflyxxi/common';

export default async function rank(rankRules, ranking, items) {
	const itemScoreList = [];
	for (const item of items) {
		itemScoreList.push({item});
	}

	const rankScale = await generateScoreScale(rankRules, ranking, itemScoreList);
	await scoreAndSortItems(rankRules, itemScoreList, rankScale);
	return itemScoreList;
}

async function scoreAndSortItems(rankRules, itemScoreList, rankScale) {
	const promises = [];
	for (const itemScore of itemScoreList) {
		promises.push(getFinalScore(rankRules, rankScale, itemScore));
	}

	await Promise.all(promises);

	itemScoreList.sort((alpha, beta) => beta.score - alpha.score);
}

/**
 * Generates an object that describes how each ranked property should be scored on a scale.
 * For example, if the min height in the item list is 130 and the max height is 150, then for
 * each mm, it would be equal to X points. If the min height is 140 and the max is 145, then
 * each mm is worth Y points, where Y > X.
 */
async function generateScoreScale(rankRules, rankList, itemScoreList) {
	const scales = {};

	for (const r of rankList) {
		scales[r] = initScoreScaleForRank(r, rankRules[r], itemScoreList);
	}

	let i = rankList.length;
	for (const r of rankList) {
		populateScoreScaleForRank(scales[r], 2 ** i--, rankRules[r]);
	}

	return scales;
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
	const version = getVersionObject(value);
	const {semantic} = rankScale;
	if (version[semantic] && rankRule.scoreMethod === 'PREFER_HIGH') {
		return (version[semantic] - rankScale[semantic].min) * rankScale.multiplier;
	}

	if (version[semantic] && rankRule.scoreMethod === 'PREFER_LOW') {
		return (rankScale[semantic].max - version[semantic]) * rankScale.multiplier;
	}

	return 0;
}

async function getFinalScore(rankRules, rankScale, itemScore) {
	itemScore.scoreBreakdown = {};
	itemScore.score = 0;
	// Set identifiers
	for (const attribute in rankRules) {
		if (rankRules[attribute].type === 'identifier') {
			itemScore[attribute] = lodash.get(itemScore.item, attribute);
		}
	}

	// Set scores
	for (const r in rankScale) {
		const value = lodash.get(itemScore.item, r);
		let score = 0;
		if (rankRules[r]) {
			switch (rankRules[r].type) {
				case 'number': {
					score = scoreNumber(value, rankRules[r], rankScale[r]);
					break;
				}

				case 'boolean': {
					score = scoreBoolean(value, rankRules[r], rankScale[r]);
					break;
				}

				case 'version': {
					score = scoreVersion(value, rankRules[r], rankScale[r]);
					break;
				}

				default: {
					console.error('Invalid type configured: rank=', r, 'type=', rankRules[r].type);
					break;
				}
			}
		}

		itemScore.scoreBreakdown[r] = score;
		itemScore.score += score;
	}

	delete itemScore.item;
}

function initScoreScaleForRank(r, rankRule, itemScoreList) {
	const result = {};
	if (rankRule) {
		const mapValues = {};
		switch (rankRule.type) {
			case 'number': {
				mapValues.values = [];
				break;
			}

			case 'version': {
				mapValues.major = [];
				mapValues.minor = [];
				mapValues.patch = [];
				break;
			}

			default: {
				// Skip any types that don't need counting
				return result;
			}
		}

		for (const itemScore of itemScoreList) {
			const value = lodash.get(itemScore.item, r);

			if (value) {
				let version;
				switch (rankRule.type) {
					case 'number': {
						mapValues.values.push(value);
						break;
					}

					case 'version': {
						version = getVersionObject(value);
						if (version?.major !== null) mapValues.major.push(version.major);
						if (version?.minor !== null) mapValues.minor.push(version.minor);
						if (version?.patch !== null) mapValues.patch.push(version.patch);
						break;
					}

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
	}

	return result;
}

function populateScoreScaleForRank(scoreScale, maxPoints, rankRule) {
	if (rankRule) {
		let temporarySemantic;
		let semantic = 'major';
		switch (rankRule.type) {
			case 'number': {
				scoreScale.multiplier = maxPoints / (scoreScale.values.max - scoreScale.values.min);
				break;
			}

			case 'version': {
				for (temporarySemantic of ['major', 'minor', 'patch']) {
					if (scoreScale[temporarySemantic]?.max !== scoreScale[temporarySemantic]?.min) {
						semantic = temporarySemantic;
						break;
					}
				}

				scoreScale.semantic = semantic;
				scoreScale.multiplier = maxPoints / (scoreScale[semantic].max - scoreScale[semantic].min);
				break;
			}

			default: {
				scoreScale.multiplier = maxPoints;
			}
		}
	}
}
