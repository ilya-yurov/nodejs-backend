import PostService from "../service/PostService.js";

// Работа с клиент-серверной составляющей, params, body, headers, etc. - это про контроллеры
class PostController {
    async create (req, res) {
        try {
            console.log(req.files);
            const post = await PostService.create(req.body, req.files.picture);

            res.json(post)
        } catch (e) {
            // Обработка на случай ошибки. Если не сделать, то сервер падает.
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll();

            return res.json(posts)
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id);

            return res.json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await PostService.update(req.body);

            return res.json(updatedPost);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id);

            return res.json(post);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new PostController();
