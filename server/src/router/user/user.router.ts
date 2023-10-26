import express from 'express';
import { userController } from './index';
import { validateUserUpdate, verify, checkAuthor,validateStatusUser } from '../../middleware/';
const router = express.Router();

router.get('/', userController.getUsers);
router.put('/:id',validateUserUpdate ,verify,checkAuthor(['ADMIN','MODERATOR']),userController.updateUser);
router.delete('/:id',verify, userController.deleteUser);

router.post('/:id/changeStatus',validateStatusUser,verify,checkAuthor(['ADMIN','MODERATOR']),userController.changeStatus);

export default router;