import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid'
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDTO {
    @ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли' })
    @IsString({ message: 'Должно быть строкой' })
    readonly value: string;
    @ApiProperty({ example: v4(), description: 'Айдишник пользователя' })
    @IsNumber({ allowNaN: false }, { message: 'Должно быть числом' })
    readonly userId: string;
}
