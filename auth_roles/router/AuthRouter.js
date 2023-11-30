import {Router} from "express";
import AuthController from "../controller/AuthController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import RoleMiddleware from "../middleware/RoleMiddleware.js";
// Это валидатор
import {check} from "express-validator";

const router = new Router();

//Валидаторы это middleware. Передаем их в массиве вторым параметром
router.post('/register', [
    // Проверяем поле username, чтобы оно не было пустым
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть длиннее 3 и меньше 10 символов")
        .isLength({min: 3, max: 10})
], AuthController.registration);
router.post('/login', AuthController.login);
//Вот сюда прокидываем мидлвэйр, т.к. это может смотреть только авторизованный пользователь. Роли передаются в массиве
router.get('/users', AuthMiddleware, RoleMiddleware(['ADMIN']), AuthController.getUsers);

export default router;
