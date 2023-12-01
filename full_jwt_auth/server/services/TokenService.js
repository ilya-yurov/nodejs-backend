// Сервисы нужны чтобы контроллеры не были слишком "толстыми" (с большим нагромождением логики)
import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        });

        return { accessToken, refreshToken };
    }

    async saveToken(userId, refreshToken) {
        // При таком подходе в БД у одного пользователя может быть только один токен
        // Т.е. при попытке зайти с другого устройства с предыдущего юзера выкинет, т.к. токен перезатрется
        // Чтобы это пофиксить нужно сохранять массив токенов, но стоит учитывать тот факт, что токены перезаписываются и могут умирать
        // Если не продумать механизм, который "протухшие" токены с БД удаляет, то БД превратится в помойку токенов
        const tokenData = await Token.findOne({ user: userId });

        // Если у данного пользователя есть активный токен, то мы его перезаписываем
        if (tokenData) {
            tokenData.refreshToken = refreshToken;

            return tokenData.save();
        }

        const token = await Token.create({ user: userId, refreshToken });

        return token;
    }
}

export default new TokenService();
