import express from 'express'
import { createComment, getUserComments   } from '../controller/comment.js';

const router = express.Router();


router.post('/', createComment)
// router.route('/:id').put(updateComment).delete(deleteComment)

router.get('/timeline', getUserComments)
export default router