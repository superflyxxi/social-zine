import express from 'express';
import asyncHandler from 'express-async-handler';
import generate from '../controllers/generate.js';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Posts:
 *       - type: object
 *         properties:
 *           href:
 *             type: string
 *             format: uri
 *             description: Refernce to the phone object for details on what was used to calcualte score.
 *           score:
 *             type: number
 *             description: The score given to this phone.
 *             example: 100.0
 *
 *     Zine:
 *       type: object
 *       properties:
 *         zine:
 *           type: array
 *           description: An array of posts ranked.
 *           items:
 *             $ref: '#/components/schemas/Posts'
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
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zine'
 *       default:
 *         description: All other errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/v1/users/:user_id/zines', asyncHandler(generate));

export default router;
