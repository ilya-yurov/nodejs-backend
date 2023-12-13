import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "src/roles/roles.service";
import {RoleDTO} from "src/roles/DTO/RoleDTO";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "src/roles/roles.model";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() dto: RoleDTO) {
        return this.rolesService.create(dto);
    }

    // Динамически изменяющийся участок пути в который передается value
    @ApiOperation({summary: 'Получить роль по значению'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:value')
    // Чтобы вытащить поле value из тела запроса передаем его в декораторе @Param
    getByValue(@Param('value') value: string) {
        return this.rolesService.getByValue(value);
    }
}
