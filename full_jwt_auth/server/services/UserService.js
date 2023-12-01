// Сервисы нужны чтобы контроллеры не были слишком "толстыми" (с большим нагромождением логики)
// Тут реализована логика работы, взаимодействие с БД
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import MailService from './MailService.js';
import TokenService from './TokenService.js';
import UserDTO from '../DTO/UserDTO.js';

class UserService {
    async register(email, password) {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw new Error(`Пользователь с адресом ${email} уже существует`);
        }

        // Хэшируем пароль и кладем его в БД вместе со ссылкой на активацию
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = v4();
        const user = await User.create({
            email,
            password: hashPassword,
            activationLink,
        });

        await MailService.sendActivationMail(email, activationLink);

        const userDTO = new UserDTO(user); // id, email, isActivated
        // В качестве payload должна быть некоторая информация, но мы не должны помещать туда пароль и пр. постороннюю информацию
        // Т.к. для генерации токенов нам нужен объект а не instance класса мы спредим ДТО
        const tokens = TokenService.generateTokens({ ...userDTO });

        await TokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }
}

export default new UserService();
