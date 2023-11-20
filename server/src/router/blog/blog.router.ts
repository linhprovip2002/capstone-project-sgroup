import express from 'express';
import { blogController } from './index'
import { checkAuthor, verify,validateUpdateBlogs } from '../../middleware';
const router = express.Router();

router.get('/awaiting-approval', verify, checkAuthor(['ADMIN','MODERATOR']),blogController.getBlogAwaitingApproval);
router.get('/newest', blogController.getNewestBlog);
router.get('/popular', blogController.getPopularBlog);
router.patch('/:id/review', verify, checkAuthor(['ADMIN','MODERATOR']),blogController.approvedOrRejectBlog);
router.get('/', blogController.getBlogs);
router.post('/', verify, blogController.createBlog);
router.get('/:id', blogController.getBlogById);
router.patch('/:id', verify,checkAuthor(['ADMIN','MODERATOR','USER']) ,validateUpdateBlogs, blogController.updateBlog);
router.delete('/:id', verify, checkAuthor(['ADMIN','MODERATOR','USER']), blogController.deleteBlog);

export default router;