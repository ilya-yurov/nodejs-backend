import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDTO } from 'src/posts/DTO/CreatePostDTO';
import { PostsService } from 'src/posts/posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    // Если принимает файлы, то нужно указать UseInterceptors с FileInterceptor
    @UseInterceptors(FileInterceptor('image'))
    async create(
        // Тело запроса
        @Body() dto: CreatePostDTO,
        // Библиотека из неста для получения файла
        @UploadedFile() image: any,
    ) {
        return this.postsService.create(dto, image);
    }
}
