import {client as dbClient} from '../db/index.js';
const DB_POSTS_COLLECTION = 'posts';

export async function getPhones(req, res) {
	dbClient.collection(DB_POSTS_COLLECTION)
		.find({})
		.limit(100)
		.toArray(function (err, result) {
			if (err) {
				res.status(500);
			} else {
				res.json(result);
			}
		});
}
