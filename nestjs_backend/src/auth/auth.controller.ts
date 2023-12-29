import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/users/DTO/UserDTO';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/roles/roles.model';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Логин' })
    @ApiResponse({
        status: 200,
        type: 'Jwt token',
        description: 'Приходит jwt токен'
    })
    @Post('/login')
    login(@Body() userDto: UserDTO) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Регистрация' })
    @Post('/register')
    register(@Body() userDto: UserDTO) {
        return this.authService.register(userDto);
    }
}
