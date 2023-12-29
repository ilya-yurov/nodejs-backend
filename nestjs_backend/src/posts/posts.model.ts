import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, BelongsTo, ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';

// Описываем те поля, которые нужны для создания объекта этого класса
// Передаем вторым дженериком в  Model
interface PostCreationAttrs {
    title: string;
    content: string;
    userId: string;
    image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    // тип поля int - числовой, unique - уникальный, autoIncrement - автоинкремент (+1), primaryKey - первичный ключ
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Заголовок', description: 'Заголовок поста' })
    // тип = строка, должен быть уникальным в бд, должен быть не равен нулю
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @ApiProperty({ example: 'Текст поста', description: 'Текст поста' })
    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @Column({ type: DataType.STRING })
    image: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    // Создаем связь один-ко-многим, т.к. одни пользователь может иметь много постов
    @BelongsTo(() => User)
    author: User;
}
