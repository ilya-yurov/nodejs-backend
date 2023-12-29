import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from 'src/posts/DTO/CreatePostDTO';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from 'src/posts/posts.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private filesService: FilesService,
    ) {}

    async create(dto: CreatePostDTO, image: any) {
        const fileName = await this.filesService.createFile(image);
        const post = await this.postRepository.create({ ...dto, image: fileName });

        return post;
    }
}
