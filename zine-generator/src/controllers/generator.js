import {server, rankRules} from '../config/index.js';
import validation from '../helpers/validation.js';
import rank from '../services/rank-score.js';

export default async function generate(req, res) {
	validation(req.body, {
		startDate: {presence: true, type: 'date'},
		endDate: {presence: true, type: 'date'},
	});

	const items = [];
	const ranking = ['comments', 'likes', 'date'];
	const rankedList = await rank(rankRules, ranking, items);
	//res.set('cache-control', 'public, max-age=2419200').send({
	res.send({
		best: rankedList[0],
		results: rankedList,
	});
}
