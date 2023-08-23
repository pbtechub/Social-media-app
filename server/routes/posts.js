import express from 'express'
import { createPost, getUserPosts, updatePost, deletePost, likePost, commentPost } from '../controller/post.js';

const router = express.Router();


router.post('/', createPost)
router.route('/:id').put(updatePost).delete(deletePost)
router.put('/:id/like', likePost)
router.put('/:id/comment', commentPost)
router.get('/timeline/:id', getUserPosts)


export default router