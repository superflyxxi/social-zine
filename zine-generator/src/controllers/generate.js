import process from 'node:process';
import axios from 'axios';
import {validate} from '@superflyxxi/common';
import {rankRules} from '../config/index.js';
import rank from '../services/rank.js';

const USER_POSTS_BASE_URL = process.env.USER_POSTS_BASE_URL ?? 'http://localhost';

export default async function generate(req, res) {
	validate(req.body, {
		startDate: {presence: false, type: 'datetime'},
		endDate: {presence: false, type: 'datetime'},
	});

	const items = await axios.get(USER_POSTS_BASE_URL + '/v1/users/' + req.params.user_id + '/posts', {
		params: {
			startDate: req.body.startDate,
			endDate: req.body.endDate,
		},
	}).data;
	// Const ttl = res.headers['cache-control'] ? res.headers['cache-control'].match(/max-age=(\d+)/i)[1] : 600;
	const ranking = ['comments', 'likes', 'date'];
	const rankedList = await rank(rankRules, ranking, items);
	// Res.set('cache-control', 'public, max-age=2419200').send({
	res.send({
		zine: rankedList,
	});
}
