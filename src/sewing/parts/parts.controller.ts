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
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('sewing/parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Post()
  create(@Body() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Get()
  findAll(
    @Query('page') pageNumber?: number,
    @Query('limit') pageSize?: number,
  ) {
    return this.partsService.findAll(pageNumber ?? 1, pageSize ?? 100);
  }

  @Roles({
    roles: ['vuteq-internal:sewing-operator'],
    mode: RoleMatchingMode.ANY,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partsService.update(id, updatePartDto);
  }

  @Roles({ roles: ['vuteq-internal:sewing-super'], mode: RoleMatchingMode.ANY })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partsService.remove(id);
  }
}
