import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import {
  AuthenticatedUser,
  RoleMatchingMode,
  Roles,
} from 'nest-keycloak-connect';
import { CheckHistoryDto } from './dto/check-history.dto';

@Controller('ansei/histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  @Roles({ roles: ['ansei-operator'], mode: RoleMatchingMode.ANY })
  create(
    @Body() createHistoryDto: CreateHistoryDto,
    @AuthenticatedUser() user: any,
  ) {
    return this.historiesService.create(createHistoryDto, user);
  }

  @Post('check')
  @Roles({ roles: ['ansei-operator'], mode: RoleMatchingMode.ANY })
  findOne(@Body() checkHistoryDto: CheckHistoryDto) {
    return this.historiesService.check(checkHistoryDto);
  }

  @Post('failed')
  @Roles({ roles: ['ansei-operator'], mode: RoleMatchingMode.ANY })
  createFailed(
    @Body() createHistoryDto: CreateHistoryDto,
    @AuthenticatedUser() user: any,
  ) {
    return this.historiesService.createFailed(createHistoryDto, user);
  }

  @Get()
  @Roles({ roles: ['ansei-super'], mode: RoleMatchingMode.ANY })
  findAll(
    @Query('page') pageNumber?: number,
    @Query('limit') pageSize?: number,
  ) {
    return this.historiesService.findAll(pageNumber ?? 1, pageSize ?? 100);
  }
}
