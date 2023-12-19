import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid'

export class BanUserDTO {
    @ApiProperty({ example: v4(), description: 'Айдишник пользователя' })
    readonly userId: string;

    @ApiProperty({ example: 'Спам в комментариях', description: 'Причина бана юзера' })
    readonly reason: string;
}
