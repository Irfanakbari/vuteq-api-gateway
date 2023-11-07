import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('hpmdlv/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  findAll() {
    return this.dashboardService.findAll();
  }
}
