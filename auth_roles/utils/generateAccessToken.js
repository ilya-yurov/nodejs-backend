import jwt from "jsonwebtoken"
import config from "../config.js"

// id и roles будем прятать внутри токена
const generateAccessToken = (payload, expires = 24) => {
    return jwt.sign(payload, config.secret, {expiresIn: `${expires}h`})
}

export default generateAccessToken;
