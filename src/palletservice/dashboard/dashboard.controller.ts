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
  @Roles({
    roles: [
      'pallet-control:admin',
      'pallet-control:super',
      'pallet-control:viewer',
    ],
  })
  findAll(@AuthenticatedUser() user: UserInfo) {
    return this.dashboardService.findAll(user);
  }

  @Get(':id')
  @Roles({
    roles: [
      'pallet-control:admin',
      'pallet-control:super',
      'pallet-control:viewer',
    ],
  })
  findOne(@Param('id') id: string, @AuthenticatedUser() user: UserInfo) {
    return this.dashboardService.findOne(id, user);
  }
}
