import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserDTO {
    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректная почта' })
    readonly email: string;
    @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
    @Length(4, 64, {
        message: 'Длина пароля должна быть не менее 4 и не более 64 символов',
    })
    readonly password: string;
}
