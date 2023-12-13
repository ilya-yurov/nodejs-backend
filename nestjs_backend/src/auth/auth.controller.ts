import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserDTO} from "src/users/DTO/UserDTO";
import {AuthService} from "src/auth/auth.service";
import {User} from "src/users/users.model";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Логин'})
    @Post('/login')
    login(@Body() userDto: UserDTO) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Регистрация'})
    @Post('/register')
    register(@Body() userDto: UserDTO) {
        return this.authService.register(userDto);
    }
}
