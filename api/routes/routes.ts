import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import * as userController from '../controllers/authentication.controller';
import { checkAuthRequest } from '../controllers/authentication.controller';

const router = Router();

router.post('/getDetail', postController.getDetail);
router.get('/getAll',postController.getAll);

router.post('/user/signUp', userController.signUp);
router.post('/user/signIn', userController.signIn);


export default router;