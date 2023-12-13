import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "src/roles/roles.service";
import {RoleDTO} from "src/roles/DTO/RoleDTO";

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post()
    create(@Body() dto: RoleDTO) {
        return this.rolesService.create(dto);
    }

    // Динамически изменяющийся участок пути в который передается value
    @Get('/:value')
    // Чтобы вытащить поле value из тела запроса передаем его в декораторе @Param
    getByValue(@Param('value') value: string) {
        return this.rolesService.getByValue(value);
    }
}
