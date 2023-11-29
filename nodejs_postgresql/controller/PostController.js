import db from "../db.js";

class PostController {
    async createPost(req, res) {
        try {
            const { title, content, userId } = req.body;
            const newPost = await db.query(
                'INSERT INTO post (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
                [title, content, userId]
            )

            res.json(newPost.rows[0])
        } catch (e) {
            console.log(e)
        }
    }

    async getPostsByUser(req, res) {
        try {
            const { id } = req.query;
            const posts = await db.query(
                'SELECT * FROM post WHERE user_id = $1',
                [id]
            )

            res.json(posts.rows)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new PostController();
