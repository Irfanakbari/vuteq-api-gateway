import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Controller({
  path: 'pallet/dashboard',
})
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Roles({ roles: ['admin', 'pallet-control:super', 'viewer'] })
  findAll(@AuthenticatedUser() user: UserInfo) {
    return this.dashboardService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }
}
