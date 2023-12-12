import {ApiProperty} from "@nestjs/swagger";

export class UserDTO {
    @ApiProperty({example: '123456', description: 'Пароль пользователя'})
    readonly email: string
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    readonly password: string
}
