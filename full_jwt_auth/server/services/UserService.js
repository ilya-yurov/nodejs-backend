// Сервисы нужны чтобы контроллеры не были слишком "толстыми" (с большим нагромождением логики)
// Тут реализована логика работы, взаимодействие с БД
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import MailService from './MailService.js';
import TokenService from './TokenService.js';
import UserDTO from '../DTO/UserDTO.js';
import ApiError from '../exceptions/ApiError.js';

class UserService {
    async register(email, password) {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(
                `Пользователь с адресом ${email} уже существует`
            );
        }

        // Хэшируем пароль и кладем его в БД вместе со ссылкой на активацию
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4();
        const user = await User.create({
            email,
            password: hashPassword,
            activationLink,
        });

        // Отправляем письмо с ссылкой на активацию
        await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );

        // DTO нужно для того, чтобы привести юзера к нужному виду и выкинуть из модели все ненужное
        const userDTO = new UserDTO(user); // id, email, isActivated
        // В качестве payload должна быть некоторая информация, но мы не должны помещать туда пароль и пр. постороннюю информацию
        // Т.к. для генерации токенов нам нужен объект а не instance класса мы спредим ДТО
        const tokens = TokenService.generateTokens({ ...userDTO });

        await TokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }

    async activate(activationLink) {
        const user = await User.findOne({ activationLink });

        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }

        user.isActivated = true;

        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }

        const isEqualPassword = await bcrypt.compare(password, user.password);

        if (!isEqualPassword) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const userDTO = new UserDTO(user);
        const tokens = TokenService.generateTokens({ ...userDTO });

        await TokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        // Делаем проверку на наличие токена, если нет - то возвращаем ошибку что пользователь не авторизован
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findById(userData.id);
        const userDTO = new UserDTO(user);
        const tokens = TokenService.generateTokens({ ...userDTO });

        await TokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }
}

export default new UserService();
