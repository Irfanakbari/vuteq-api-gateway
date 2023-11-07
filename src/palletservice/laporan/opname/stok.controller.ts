import { Controller, Get } from '@nestjs/common';
import { OpnameService } from './stok.service';
import { Roles } from 'nest-keycloak-connect';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/laporan/opname',
})
export class OpnameController {
  constructor(private opnameService: OpnameService) {}
  @Get()
  @Roles({ roles: ['admin', 'super', 'viewer'] })
  getOpname() {
    return this.opnameService.getAllOpname();
  }
}
