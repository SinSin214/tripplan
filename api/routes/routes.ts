import { Router } from 'express';
import * as postController from '../controllers/post.controller';

const router = Router();

router.post('/detail', postController.getPostDetail);

export default router;