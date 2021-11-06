import Post from '../models/post.js';

export async function listPosts(req, res) {
	res.status(200);
	res.json(await Post.find({}));
}
