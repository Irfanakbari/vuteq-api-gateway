import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentService } from './department.service';
import { Roles } from 'nest-keycloak-connect';
import { UpdateDepartmentDto } from './dto/update-department.dto';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/departments',
})
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}
  @Get()
  @Roles({ roles: ['admin', 'super'] })
  getDepartment() {
    return this.departmentService.getAllDepartment();
  }

  @Post()
  @Roles({ roles: ['super'] })
  createDepartment(@Body() data: CreateDepartmentDto) {
    return this.departmentService.createDepartment(data);
  }

  @Delete(':id')
  @Roles({ roles: ['super'] })
  deleteDepartment(@Param('id') id: string) {
    return this.departmentService.deleteDepartment(id);
  }

  @Patch(':id')
  @Roles({ roles: ['super'] })
  updateDepartment(@Param('id') id: string, @Body() data: UpdateDepartmentDto) {
    return this.departmentService.updateDepartment(data, id);
  }
}
