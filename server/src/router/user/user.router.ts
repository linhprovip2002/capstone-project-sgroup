import express from 'express';
import { userController } from './index';
import { validateUserUpdate, verify, checkAuthor,validateStatusUser } from '../../middleware/';
const router = express.Router();

router.get('/:id/blogs', userController.getBlogsByUserId);
router.get('/', checkAuthor(['ADMIN','MODERATOR']) ,userController.getUsers);
router.get('/me',userController.getMe);
router.get('/:id', userController.getUserById);
router.put('/:id',validateUserUpdate ,verify,checkAuthor(['ADMIN','MODERATOR','USER']),userController.updateUser);
router.delete('/:id',verify, checkAuthor(['ADMIN','MODERATOR']) , userController.deleteUser);

router.post('/:id/changeStatus',validateStatusUser, verify,checkAuthor(['ADMIN','MODERATOR']),userController.changeStatus);
router.patch('/:id/changeRole',verify,checkAuthor(['ADMIN']),userController.changeRole);
router.patch('/:id/avatar',verify,checkAuthor(['ADMIN','MODERATOR']),userController.changeAvatar);

export default router;