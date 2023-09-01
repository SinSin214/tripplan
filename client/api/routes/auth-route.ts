import { Router } from 'express';
import * as userController from '../controllers/authentication-controller';
import { checkAuthRequest } from '../controllers/authentication-controller';

const router = Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.post('/activeUser', userController.activeUser);


export default router;