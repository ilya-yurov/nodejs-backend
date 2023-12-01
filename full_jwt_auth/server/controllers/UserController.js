// В контроллерах работаем с HTTP-составляющей
import UserService from "../services/UserService.js";
import {REFRESH_TOKEN_EXPIRES_IN_MS} from "../constant/time.js";

class UserController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.register(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                // Так указывается, потому что
                maxAge: REFRESH_TOKEN_EXPIRES_IN_MS,
                // Этот параметр задает то, что куку нельзя изменять или получать внутри браузера
                // Для https нужно указать secure: true
                httpOnly: true,
            })

            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {
        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next) {
        try {
        } catch (e) {
            console.log(e);
        }
    }

    async activate(req, res, next) {
        try {
        } catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {
        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['123', '123']);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserController();
