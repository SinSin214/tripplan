import { Router } from 'express';
import * as postController from '../controllers/post-controller';
import { checkAuthRequest } from '../controllers/authentication-controller';

const router = Router();

router.post('/getDetail', postController.getDetail);
router.get('/getAll',postController.getAll);

export default router;