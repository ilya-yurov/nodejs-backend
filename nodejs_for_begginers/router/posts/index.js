import {Router} from "express";
import PostController from "../../controller/PostController.js";

const router = new Router();

// Операция создания поста
router.post('/posts', PostController.create);

// Операция получения постов
router.get('/posts', PostController.getAll);

// Операция получения конкретного поста
router.get('/posts/:id', PostController.getOne);

// Операция обновления конкретного поста?
router.put('/posts', PostController.update);

// Операция удаления конкретного поста
router.delete('/posts/:id', PostController.delete);

export default router;
