import Post from '../models/post.js';
import {NotFoundError} from '@superflyxxi/common';

export async function listPosts(req, res) {
	res.json(await Post.find().select('-__v'));
	res.status(200);
}

export async function getPost(req, res) {
	const post = await Post.findById(req.params.id).select('-__v').exec();
	if (post === null) {
		throw new NotFoundError(req.params.id);
	}
	res.json(post);
	res.status(200);
}

export async function createPost(req, res) {
	const post = new Post(req.body);
	await post.save();
	res.status(200);
	res.send(post);
}
