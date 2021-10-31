import {validate} from '@superflyxxi/common';
import {rankRules} from '../config/index.js';
import rank from '../services/rank-score.js';

export default async function generate(req, res) {
	validate(req.body, {
		startDate: {presence: true, type: 'date'},
		endDate: {presence: true, type: 'date'},
	});

	const items = [];
	const ranking = ['comments', 'likes', 'date'];
	const rankedList = await rank(rankRules, ranking, items);
	// Res.set('cache-control', 'public, max-age=2419200').send({
	res.send({
		best: rankedList[0],
		results: rankedList,
	});
}
