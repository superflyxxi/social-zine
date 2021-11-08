import express from 'express';
import asyncHandler from 'express-async-handler';
import generate from '../controllers/generate.js';

const zine = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         href:
 *           type: string
 *           format: uri
 *           description: Refernce to the phone object for details on what was used to calcualte score.
 *           example: https://facebook.com/post
 *         score:
 *           type: number
 *           description: The score given to this phone.
 *           example: 100.0
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
 *         user:
 *           type: object
 *           description: The user who made the comment.
 *           $ref: '#/components/schemas/User'
 *
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *           example: Super
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *           example: Fly
 *         userName:
 *           type: string
 *           description: The user's username. If none exists, it's the firstName and lastName.
 *           example: SuperFlyXXI
 *
 *     Like:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           description: The user who liked the post.
 *           $ref: '#/components/schemas/User'
 *
 *     Zine:
 *       type: object
 *       properties:
 *         zine:
 *           type: array
 *           description: An array of posts ranked.
 *           items:
 *             $ref: '#/components/schemas/Post'
 */

/**
 * @openapi
 * /v1/users/{user_id}/zines:
 *   get:
 *     summary: Get the latest zine
 *     description: |
 *       Gets the latest zine.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: The user id to fetch zines.
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         description: Optional start date. If not provided, defaults to If-Modified-Since header.
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         description: Optional end date. If not provided, defaults to current date-time.
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: If-Modified-Since
 *         in: header
 *         description: The standard HTTP Cache header that controls when it was last read. Pass to honor cache.
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Okay
 *         headers:
 *           Last-Modified:
 *             type: string
 *             format: date-time
 *             description: The last modified source.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zine'
 *       '304':
 *         description: Not Modified
 *       default:
 *         description: All other errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
zine.get('/v1/users/:user_id/zines', asyncHandler(generate));

export default zine;
