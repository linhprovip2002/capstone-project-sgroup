import express from 'express';
import { userController } from './index';
import { validateUserUpdate, verify, checkAuthor,validateStatusUser } from '../../middleware/';
const router = express.Router();

router.get('/', checkAuthor(['ADMIN','MODERATOR']) ,userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id',validateUserUpdate ,verify,checkAuthor(['ADMIN','MODERATOR']),userController.updateUser);
router.delete('/:id',verify, checkAuthor(['ADMIN','MODERATOR']) , userController.deleteUser);

router.post('/:id/changeStatus',validateStatusUser,verify,checkAuthor(['ADMIN','MODERATOR']),userController.changeStatus);

export default router;