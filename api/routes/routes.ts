import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/getDetail', postController.getDetail);
router.get('/getAll', postController.getAll);

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);


export default router;