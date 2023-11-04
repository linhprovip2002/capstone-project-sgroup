import express from 'express';
import { blogController } from './index'
import { checkAuthor, verify } from '../../middleware';
const router = express.Router();

router.get('/', verify, blogController.getBlogs);
router.post('/', verify, blogController.createBlog);
router.patch('/:id', verify, blogController.updateBlog);

router.get('/awaiting-approval', verify, checkAuthor(['ADMIN','MODERATOR']),blogController.getBlogAwaitingApproval);
router.patch('/:id/review', verify, checkAuthor(['ADMIN','MODERATOR']),blogController.approvedOrRejectBlog);
export default router;