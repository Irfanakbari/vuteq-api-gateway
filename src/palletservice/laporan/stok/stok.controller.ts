import { Controller, Get } from '@nestjs/common';
import { StokService } from './stok.service';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserInfo } from '../../../interfaces/userinfo.interface';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/laporan/stok',
})
export class StokController {
  constructor(private stokService: StokService) {}
  @Get()
  @Roles({ roles: ['admin', 'super', 'viewer'] })
  getStok(@AuthenticatedUser() user: UserInfo) {
    return this.stokService.getAllStok(user);
  }
}
