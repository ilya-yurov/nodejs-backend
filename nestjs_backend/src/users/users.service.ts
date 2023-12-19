import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UserDTO } from './DTO/UserDTO';
import { RolesService } from 'src/roles/roles.service';
import RoleEnum from 'src/enums/Role';
import {AddRoleDTO} from "src/users/DTO/AddRoleDTO";
import {BanUserDTO} from "src/users/DTO/BanUserDTO";

@Injectable()
export class UsersService {
    // Инжектим модель через конструктор
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService
    ) {}

    async create(dto: UserDTO) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getByValue(RoleEnum.Admin);

        // Указываем то, что эта роль принадлежит пользователю.
        // Функция $set ИНИЦИАЛИЗИРУЕТ роль в базу данных, но сам user без роли.
        // Для добавления используется $add.
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

    async addRole(dto: AddRoleDTO) {
        // Функция поиска по primary key
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getByValue(dto.value);

        if (role && user) {
            // Делаем запись в БД для пользователя. $add - функция sequelize для добавления
            await user.$add('role', role.id);

            return dto;
        }

        throw new HttpException('Пользоваель или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDTO) {
        const user = await this.userRepository.findByPk(dto.userId);

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        user.banned = true;
        user.banReason = dto.reason;

        // Функция save() сохраняет изменения в БД
        await user.save();

        return user;
    }
}
