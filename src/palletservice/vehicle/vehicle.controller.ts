import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleService } from './vehicle.service';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserInfo } from '../../interfaces/userinfo.interface';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/vehicles',
})
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}
  @Get()
  @Roles({ roles: ['super', 'admin'] })
  getVehicle(@AuthenticatedUser() user: UserInfo) {
    return this.vehicleService.getAllVehicle(user);
  }

  @Post()
  @Roles({ roles: ['super'] })
  createVehicle(@Body() data: CreateVehicleDto) {
    return this.vehicleService.createVehicle(data);
  }

  @Delete(':id')
  @Roles({ roles: ['super'] })
  deleteVehicle(@Param('id') id: string) {
    return this.vehicleService.deleteVehicle(id);
  }
}
