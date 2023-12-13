import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "src/users/users.model";
import {Role} from "src/roles/roles.model";
import {UserRoles} from "src/models/common/user-roles.model";
import {RolesModule} from "src/roles/roles.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles]),
      // Так нужно делать, если мы хотим импортировать какой-то сервис из другого модуля
      RolesModule
  ],
})
export class UsersModule {}
