import Post from "../model/Post.js";
import FileService from "./FileService.js";

// В сервисах лежит бизнес-логика, т.е. то, что никак не связано с req/res
// Обработку ошибок лучше делать тут
class PostService {
    async create (post, picture) {
        const fileName = await FileService.saveFile(picture);
        const createdPost = await Post.create({...post, picture: fileName});

        return createdPost;
    }

    async getAll() {
        const posts = await Post.find();

        return posts
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id не указан')
        }

        const post = await Post.findById(id);

        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('Id не указан')
        }

        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true});

        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id не указан')
        }

        const post = await Post.findByIdAndDelete(id);

        return post;
    }
}

export default new PostService();
