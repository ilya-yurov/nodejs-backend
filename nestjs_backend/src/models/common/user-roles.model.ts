import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Role } from 'src/roles/roles.model';

//Атрибуты в общей таблице не нужны, т.к. вручную никакие объекты в эту таблицу добавляться не будут
//В опициях таблицы отключаем createdAt и updatedAt, чтобы не захламлять ее лишними данными
@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
    // тип поля int - числовой, unique - уникальный, autoIncrement - автоинкремент (+1), primaryKey - первичный ключ
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    // Внешние ключи помечаем декоратором @ForeignKey
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}
