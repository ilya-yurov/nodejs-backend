import { Router } from 'express'
import PostController from "../controller/PostController.js";

const router = new Router();

router.post('/post', PostController.createPost)
router.get('/post', PostController.getPostsByUser)

export default router;
