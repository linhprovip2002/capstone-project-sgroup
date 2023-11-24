import express from 'express';
import { authRouter } from './authentication';
import { userRouter } from './user';
import { blogRouter } from './blog';
import { categoryRouter } from './category';
import { commentRouter } from './comment';
import { verify } from '../middleware/authentication.middleware';


const router = express.Router();

router.use('/blog', commentRouter);
router.use('/auth', authRouter);
router.use('/users', verify, userRouter);
router.use('/blogs', blogRouter);
router.use('/categories', categoryRouter);

export default router;