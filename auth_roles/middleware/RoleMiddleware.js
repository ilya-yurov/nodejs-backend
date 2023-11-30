import jwt from "jsonwebtoken";
import config from "../config.js";

export default (roles) => {
    return (req, res, next) => {
        // Проверяем на метод, мидлвара обрабатывает только REST API
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }

            const {roles: userRoles} = jwt.verify(token, config.secret);

            // Проверяем есть ли у пользователя какая-нибудь из переданных ролей, если нет - возвращаем ошибку
            if (!userRoles.some(role => roles.includes(role))) {
                return res.status(403).json({message: "У вас нет доступа"})
            }

            next();
        } catch (e) {
            console.log(e);

            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
};
