import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserDTO} from "src/users/DTO/UserDTO";
import {UsersService} from "src/users/users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "src/users/users.model";

@ApiTags('Пользователи')
@Controller('/users')
export class UsersController {
    // Инжектим сервис
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    // Как тело запроса create принимает UserDTO
    create(@Body() dto: UserDTO) {
        return this.usersService.create(dto);
    }
    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAll();
    }
}
