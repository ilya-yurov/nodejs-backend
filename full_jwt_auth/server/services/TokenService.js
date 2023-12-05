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

    validateToken(token, isAccess) {
        try {
            return jwt.verify(
                token,
                isAccess
                    ? process.env.JWT_ACCESS_SECRET
                    : process.env.JWT_REFRESH_SECRET
            );
        } catch (e) {
            return null;
        }
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

    async removeToken(refreshToken) {
        // Запись БД в этом случае вернется, поэтому помещаем ее в переменную
        const tokenData = await Token.deleteOne({ refreshToken });

        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ refreshToken });

        return tokenData;
    }
}

export default new TokenService();
