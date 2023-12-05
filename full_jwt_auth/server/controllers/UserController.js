// В контроллерах работаем с HTTP-составляющей
import UserService from '../services/UserService.js';
import { REFRESH_TOKEN_EXPIRES_IN_MS } from '../constant/time.js';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/ApiError.js';

class UserController {
    async register(req, res, next) {
        try {
            // Вызваем валидацию данных. Из реквеста автоматически достанется тело и провалидируются нужные поля
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errors.array())
                );
            }

            const { email, password } = req.body;
            const userData = await UserService.register(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                // Так указывается, потому что время жизни куки в миллисекундах
                maxAge: REFRESH_TOKEN_EXPIRES_IN_MS,
                // Этот параметр задает то, что куку нельзя изменять или получать внутри браузера
                // Для https нужно указать secure: true
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            // Вызывая next с ошибкой мы попадаем в мидлвэйр с обработкой ошибки ?
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: REFRESH_TOKEN_EXPIRES_IN_MS,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);

            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            //Ссылку мы указали как динамический квери-параметр /activate/:link
            const activationLink = req.params.link;

            await UserService.activate(activationLink);

            // После того, как пользователь перешел по ссылке необходимо редиректнуть его на фронтенд
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e);
        }
    }

    //Функция для обновления refresh-токена
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: REFRESH_TOKEN_EXPIRES_IN_MS,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            return res.json(await UserService.getAllUsers());
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserController();
