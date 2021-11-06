import Post from '../models/post.js';

const DB_POSTS_COLLECTION = 'posts';

export async function listPosts(req, res) {
	res.status(200);
	res.json(await Post.find({}));
}
