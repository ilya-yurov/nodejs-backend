import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from 'src/users/DTO/UserDTO';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: UserDTO) {
        const user = await this.validateUser(userDto);

        return this.generateToken(user);
    }

    async register(userDto: UserDTO) {
        const candidate = await this.userService.getUserByEmail(userDto.email);

        if (candidate) {
            // В базоваом варианте в nest ошибки представлены классом HttpException
            throw new HttpException(
                'Пользователь с таким email уже существует',
                HttpStatus.BAD_REQUEST
            );
        }

        const hashPassword = await hash(userDto.password, 5);
        const user = await this.userService.create({
            ...userDto,
            password: hashPassword,
        });

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles };

        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: UserDTO) {
        const user = await this.userService.getUserByEmail(userDto.email);

        if (user) {
            const passwordEquals = await compare(userDto.password, user.password);

             if (passwordEquals) {
                 return user;
             }
        }

        // UnauthorizedException это нестовая ошибка, которая наследуется от HttpException
        throw new UnauthorizedException({
            message: 'Неверный email или пароль',
        });
    }
}
