import express from 'express';
import { verify } from '../../middleware/';
import commentController from './comment.controller';
const router = express.Router();

router.get('/:blogId/comments', commentController.getComments);
router.post('/:blogId/comments', verify ,commentController.createComment)
router.patch('/comments/:commentId/reply', verify,commentController.createReply)
router.patch('/comments/:commentId', verify,commentController.updateComment)
router.delete('/comments/:commentId', verify,commentController.deleteComment);

export default router;