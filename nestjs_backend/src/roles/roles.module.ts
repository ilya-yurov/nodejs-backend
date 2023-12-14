import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from 'src/models/common/user-roles.model';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
    // Это поле необходимо, если мы хотим экспортировать какие-то данные модуля
    exports: [RolesService],
})
export class RolesModule {}
