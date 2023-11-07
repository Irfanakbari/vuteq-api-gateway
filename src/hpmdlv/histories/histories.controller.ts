import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import {
  AuthenticatedUser,
  RoleMatchingMode,
  Roles,
} from 'nest-keycloak-connect';

@Controller('hpmdlv/histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  @Roles({ roles: ['hpm-dlv-system:operator'], mode: RoleMatchingMode.ANY })
  create(
    @Body() createHistoryDto: CreateHistoryDto,
    @AuthenticatedUser() user: any,
  ) {
    return this.historiesService.create(createHistoryDto, user);
  }

  @Post('failed')
  @Roles({ roles: ['hpm-dlv-system:operator'], mode: RoleMatchingMode.ANY })
  createFailed(
    @Body() createHistoryDto: CreateHistoryDto,
    @AuthenticatedUser() user: any,
  ) {
    return this.historiesService.createFailed(createHistoryDto, user);
  }

  @Get()
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  findAll(
    @Query('page') pageNumber?: number,
    @Query('limit') pageSize?: number,
  ) {
    return this.historiesService.findAll(pageNumber ?? 0, pageSize ?? 100);
  }
}
