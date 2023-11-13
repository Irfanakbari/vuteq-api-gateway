import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairsService } from './repairs.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import {AuthenticatedUser, Roles} from "nest-keycloak-connect";

@Controller('pallet/repairs')
export class RepairsController {
  constructor(private readonly repairsService: RepairsService) {}

  @Roles({ roles: ['operator'] })
  @Post()
  create(@Body() createRepairDto: CreateRepairDto, @AuthenticatedUser() user:any) {
    return this.repairsService.create(createRepairDto, user);
  }

  @Get()
  findAll() {
    return this.repairsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepairDto: UpdateRepairDto) {
    return this.repairsService.update(+id, updateRepairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairsService.remove(+id);
  }
}
