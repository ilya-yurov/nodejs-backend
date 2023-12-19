import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid'

export class AddRoleDTO {
    @ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли' })
    readonly value: string;
    @ApiProperty({ example: v4(), description: 'Айдишник пользователя' })
    readonly userId: string;
}
