import { Router } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/UserController.js';
import AuthMiddleware from '../middleware/Auth.js';

const router = new Router();

router.post(
    '/register',
    // Валидация данных
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    UserController.register
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
// Для активации по сссылке, которая будет приходить на почту
router.get('/activate/:link', UserController.activate);
// Для обновления refresh-токена
router.get('/refresh', UserController.refresh);
// Доступен только для авторизованных юзеров
router.get('/users', AuthMiddleware, UserController.getUsers);

export default router;
