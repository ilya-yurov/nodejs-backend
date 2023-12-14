import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/models/common/user-roles.model';

// Описываем те поля, которые нужны для создания объекта этого класса
// Передаем вторым дженериком в  Model
interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    // тип поля int - числовой, unique - уникальный, autoIncrement - автоинкремент (+1), primaryKey - первичный ключ
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
    // тип = строка, должен быть уникальным в бд, должен быть не равен нулю
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({
        example: 'true',
        description: 'Забанен пользователь или нет',
    })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'За хулиганство', description: 'Причина бана' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    // Декоратор для реализации связи many-to-many
    // Указываем c какой сущностью мы связываем и через какую таблицу мы это делаем
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
