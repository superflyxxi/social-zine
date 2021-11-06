import express from 'express';
import asyncHandler from 'express-async-handler';
import {listPosts} from '../controllers/posts.js';

const router = express.Router();

router.get('/', asyncHandler(listPosts));
export default router;
