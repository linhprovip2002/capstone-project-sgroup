import express from 'express';
import { categoryController }  from './index';
const router = express.Router();

router.get('/:slug', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getListCategories);

export default router;