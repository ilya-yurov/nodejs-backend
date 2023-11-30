import jwt from "jsonwebtoken";
import config from "../config.js";

export default (req, res, next) => {
    // Проверяем на метод, мидлвара обрабатывает только REST API
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }

        // Проверяем авторизационный токен, на выходе jwt.verify дает то, что мы в него засовывали
        // в данном случае он вернет объект с id и ролями
        // суем ответ в условное поле req.user чтобы до него можно было дальше в контроллере достучаться
        req.user = jwt.verify(token, config.secret);

        next();
    } catch (e) {
        console.log(e);

        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};
