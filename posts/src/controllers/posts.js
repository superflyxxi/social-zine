import {client as databaseClient} from '../db/index.js';

const DB_POSTS_COLLECTION = 'posts';

export async function getPhones(req, res) {
	databaseClient
		.collection(DB_POSTS_COLLECTION)
		.find({})
		.limit(100)
		.toArray(function (error, result) {
			if (error) {
				res.status(500);
			} else {
				res.json(result);
			}
		});
}
