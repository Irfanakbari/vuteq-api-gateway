import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryService } from './history.service';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Controller({
  path: 'pallet/histories',
})
export class HistoryController {
  constructor(private historyService: HistoryService) {}
  @Get()
  @Roles({ roles: ['admin', 'super', 'viewer'] })
  getPallet(
    @Query('customer') customer: string,
    @Query('vehicle') vehicle: string,
    @Query('keluarStart') keluarStart: string,
    @Query('keluarEnd') keluarEnd: string,
    @Query('masukStart') masukStart: string,
    @Query('masukEnd') masukEnd: string,
    @Query('search') search: string,
    @Query('part') part: string,
    @Query('status') status: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @AuthenticatedUser() user: UserInfo,
  ) {
    const data: {
      customer: string;
      vehicle: string;
      keluarStart: string;
      keluarEnd: string;
      masukStart: string;
      masukEnd: string;
      search: string;
      part: string;
      status: string;
      page: string;
      limit: string;
    } = {
      customer,
      vehicle,
      keluarStart,
      keluarEnd,
      masukStart,
      masukEnd,
      search,
      part,
      status,
      page,
      limit,
    };
    return this.historyService.getAllHistory(data, user);
  }

  @Post()
  @Roles({ roles: ['operator'] })
  createPallet(
    @Body() data: CreateHistoryDto,
    @AuthenticatedUser() user: UserInfo,
  ) {
    return this.historyService.createHistory(data, user);
  }

  @Patch(':id')
  @Roles({ roles: ['operator'] })
  updateHistory(
    @Body() data: UpdateHistoryDto,
    @AuthenticatedUser() user: UserInfo,
  ) {
    return this.historyService.updateHistory(data, user.preferred_username);
  }
}
