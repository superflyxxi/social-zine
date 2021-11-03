import express from 'express';
import asyncHandler from 'express-async-handler';
import {getPosts} from '../controllers/posts.js';

const router = express.Router();

router.get('/', asyncHandler(getPosts));
export default router;
