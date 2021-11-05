import mongoose from 'mongoose';

const {Schema} = mongoose;

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the post was created.
 *         content:
 *           type: string
 *           description: The contents of the post itself.
 *           example: Welcome to my first post!
 *         comments:
 *           type: array
 *           description: The comments of the post.
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *         likes:
 *           type: array
 *           description: Those who liked the post.
 *           items:
 *             $ref: '#/components/schemas/Like'
 *
 *     Comment:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the comment was made.
 *         content:
 *           type: string
 *           description: the comment itself
 *           example: Welcome to the party!
 *         userId:
 *           type: string
 *           description: The user who made the comment.
 */
const schema = new Schema({
	date: Date,
	content: String,
	comments: [{date: Date, content: String, userId: String}],
	likes: [{userId: String}],
});

export default mongoose.model('Post', schema);
