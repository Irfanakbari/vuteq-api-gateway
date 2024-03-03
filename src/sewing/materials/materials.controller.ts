import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('sewing/materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Get()
  findAll(
    @Query('page') pageNumber?: number,
    @Query('limit') pageSize?: number,
  ) {
    return this.materialsService.findAll(pageNumber, pageSize);
  }

  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id, updateMaterialDto);
  }
  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(id);
  }
}
