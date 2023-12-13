import { Injectable } from '@nestjs/common';
import {RoleDTO} from "src/roles/DTO/RoleDTO";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "src/roles/roles.model";

@Injectable()
export class RolesService {
    // Инжектим модель через конструктор
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async create(dto: RoleDTO) {
        const role = await this.roleRepository.create(dto)

        return role
    }

    async getByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});

        return role;
    }
}
