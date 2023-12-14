import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    // Т.к. авторизация будет происходить через jwt, то нужно импортировать модуль JwtModule
    // В опциях можно сразу указать секретный ключ для jwt через secret а время жизни в
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
