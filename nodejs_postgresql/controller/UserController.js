import db from "../db.js";

class UserController {
    async createUser(req, res) {
        try {
            const { name, surname } = req.body;
            // Вместо $1 и $2 будут подставляться значения из массива
            // RETURNING * говорит о том, что после создания функция вернет пользователя, по дефолту INSERT ниче не возвращает
            const newPerson = await db.query(
                `INSERT INTO person (name, surname) values ($1, $2) RETURNING *`,
                [name, surname]
            )

            res.json(newPerson.rows[0])
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query(
                `SELECT * FROM person`
            )

            res.json(users.rows)
        } catch (e) {
            console.log(e)
        }
    }

    async getOneUser(req, res) {
        try {
            const { id } = req.params;
            const user = await db.query(
                `SELECT * FROM person WHERE id = $1`,
                [id]
            )

            res.json(user.rows[0])
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(req, res) {
        try {
            const { id, name, surname } = req.body;
            // UPDATE тоже по дефолту ниче не возвращает
            const updatedUser = await db.query(
                `UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *`,
                [name, surname, id]
            )

            res.json(updatedUser.rows[0])
        } catch (e) {
            console.log(e)
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await db.query(
                `DELETE FROM person WHERE id = $1`,
                [id]
            )

            res.json(deletedUser.rows[0])
        } catch (e) {
            console.log(e)
        }
    }
}

export default new UserController();
