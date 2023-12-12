import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "src/users/users.model";
import {UserDTO} from "./DTO/UserDTO";

@Injectable()
export class UsersService {
    // Инжектим модель через конструктор
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(dto: UserDTO) {
        const user = await this.userRepository.create(dto)

        return user
    }

    async getAll() {
        const users = await this.userRepository.findAll();

        return users;
    }
}
