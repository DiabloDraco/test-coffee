import { Controller, Get, Body, Patch, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';

@ApiTags('roles')
@Controller('roles')
@ApiBearerAuth()
@Auth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  find() {
    return this.rolesService.find();
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.rolesService.findByID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }
}
