import Role from "../models/Role.js";
import User from "../models/User.js";
import {SALT} from "../constant/password.js";
import bcrypt from "bcryptjs"
import {validationResult} from "express-validator";
import generateAccessToken from "../utils/generateAccessToken.js";

class AuthController {
    async registration(req, res) {
        try {
            //В первую очередь валидируем запрос на наличие ошибок, если они есть - обрабатываем
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }

            const { username, password } = req.body;
            const candidate = await User.findOne({username});

            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }

            // Хэшируем пароль, чтобы он не хранился в БД в открытом виде
            const hashPassword = bcrypt.hashSync(password, SALT);
            const userRole = await Role.findOne({value: "USER"});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});

            await user.save();

            return res.json({message: 'Пользователь успешно зарегестрирован'});
        } catch (e) {
            console.log(e);
            res.status(400).json('Registration error')
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({username})

            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }

            const token = generateAccessToken({id: user._id, roles: user.roles});

            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json('Login error')
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthController();
