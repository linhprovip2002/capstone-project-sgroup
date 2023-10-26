import express from 'express';
import { blogController } from './index'
const router = express.Router();

router.get('/', blogController.getBlogs);
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
export default router;