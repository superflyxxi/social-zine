import Post from '../models/post.js';

export async function listPosts(req, res) {
	res.status(200);
	res.json(await Post.find().select('-__v'));
}

export async function createPost(req, res) {
	const post = new Post(req.body);
	await post.save();
	res.status(200);
	res.send(post);
}
