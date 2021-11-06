import express from 'express';
import asyncHandler from 'express-async-handler';
import {listPosts, createPost} from '../controllers/posts.js';

const router = express.Router();

router.get('/', asyncHandler(listPosts));
router.post('/', asyncHandler(createPost));

export default router;
