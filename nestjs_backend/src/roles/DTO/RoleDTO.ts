import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
    @ApiProperty({
        example: 'ADMIN',
        description: 'Уникальное значение роли пользователя',
    })
    readonly value: string;
    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    readonly description: string;
}
