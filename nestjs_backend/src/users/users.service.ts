import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UserDTO } from './DTO/UserDTO';
import { RolesService } from 'src/roles/roles.service';
import RoleEnum from 'src/enums/Role';

@Injectable()
export class UsersService {
    // Инжектим модель через конструктор
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService
    ) {}

    async create(dto: UserDTO) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getByValue(RoleEnum.User);

        // Указываем то, что эта роль принадлежит пользователю
        // Функция $set добавляет роль в базу данных, но сам user без роли
        await user.$set('roles', [role.id]);
        //Поэтому нужно обновить user с ролью как ниже
        user.roles = [role];

        return user;
    }

    async getAll() {
        // При помощи include можно указать конкретную модель, которую мы хотим подтянуть с пользователем
        // Сделав all: true мы подтягиваем все поля, с которыми как-то связан пользователь
        const users = await this.userRepository.findAll({
            include: { all: true },
        });

        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });

        return user;
    }
}
