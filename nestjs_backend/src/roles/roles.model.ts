import {Table, Model, Column, DataType, BelongsToMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "src/users/users.model";
import {UserRoles} from "src/models/common/user-roles.model";

// Описываем те поля, которые нужны для создания объекта этого класса
// Передаем вторым дженериком в  Model
interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    // тип поля int - числовой, unique - уникальный, autoIncrement - автоинкремент (+1), primaryKey - первичный ключ
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Уникальное значение роли пользователя'})
    // тип = строка, должен быть уникальным в бд, должен быть не равен нулю
    @Column({type:DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({type:DataType.STRING, allowNull: false})
    description: string;

    // Декоратор для реализации связи many-to-many
    // Указываем c какой сущностью мы связываем и через какую таблицу мы это делаем
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}
