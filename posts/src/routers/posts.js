import express from 'express';
import asyncHandler from 'express-async-handler';
import {listPosts, createPost} from '../controllers/posts.js';

const router = express.Router();

/**
 * @openapi
 * /v1/posts:
 *   get:
 *     summary: Get all posts for the user.
 *     description: |
 *       Gets all the posts for the user.
 *     parameters:
 *       - in: header
 *         name: User-Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID in question.
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       default:
 *         description: All other errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', asyncHandler(listPosts));
router.post('/', asyncHandler(createPost));

export default router;
