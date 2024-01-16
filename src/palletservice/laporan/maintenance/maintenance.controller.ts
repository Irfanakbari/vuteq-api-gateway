import { Controller, Get } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserInfo } from '../../../interfaces/userinfo.interface';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/laporan/maintenance',
})
export class MaintenanceController {
  constructor(private maintenanceService: MaintenanceService) {}
  @Get()
  @Roles({ roles: ['admin', 'super', 'viewer'] })
  getStok(@AuthenticatedUser() user: UserInfo) {
    return this.maintenanceService.getAllStok(user);
  }
}
