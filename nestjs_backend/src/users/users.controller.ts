import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import {Roles} from "src/auth/roles-auth.decorator";
import {RolesGuard} from "src/auth/roles.guard";
import {AddRoleDTO} from "src/users/DTO/AddRoleDTO";
import {BanUserDTO} from "src/users/DTO/BanUserDTO";
import Role from 'src/enums/Role';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    // Инжектим сервис
    constructor(private usersService: UsersService) {}

    // @ApiOperation({ summary: 'Создание пользователя. НЕ ИСПОЛЬЗОВАТЬ!' })
    // @ApiResponse({ status: 200, type: User })
    // @Roles(Role.Admin)
    // @UseGuards(RolesGuard)
    // // Декоратор для использования валидации
    // @UsePipes(ValidationPipe)
    // @Post()
    // // Как тело запроса create принимает UserDTO
    // create(@Body() dto: UserDTO) {
    //     return this.usersService.create(dto);
    // }
    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles(Role.User)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @ApiOperation({ summary: 'Выдать роль пользователю' })
    @ApiResponse({ status: 200 })
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDTO) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Забанить пользователя' })
    @ApiResponse({ status: 200 })
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDTO) {
        return this.usersService.ban(dto);
    }
}
