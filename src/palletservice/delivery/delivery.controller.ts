import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryService } from './delivery.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserInfo } from '../../interfaces/userinfo.interface';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/deliveries',
})
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}
  @Get()
  @Roles({
    roles: [
      'pallet-control:admin',
      'pallet-control:super',
      'pallet-control:operator',
    ],
  })
  getDestination(@AuthenticatedUser() user: UserInfo) {
    return this.deliveryService.getAllDelivery(user);
  }

  @Get(':id')
  @Roles({
    roles: [
      'pallet-control:admin',
      'pallet-control:super',
      'pallet-control:operator',
    ],
  })
  getOne(@Param('id') id: string) {
    return this.deliveryService.getOneDelivery(id);
  }

  @Post()
  @Roles({ roles: ['pallet-control:super', 'pallet-control:admin'] })
  createDestination(@Body() data: CreateDeliveryDto) {
    return this.deliveryService.createDelivery(data);
  }

  @Delete(':id')
  @Roles({ roles: ['pallet-control:super', 'pallet-control:admin'] })
  deleteDestination(@Param('id') id: string) {
    return this.deliveryService.deleteDelivery(id);
  }

  @Patch(':id')
  @Roles({ roles: ['pallet-control:super'] })
  updateDestination(@Param('id') id: string, @Body() data: UpdateDeliveryDto) {
    return this.deliveryService.updateDelivery(data, id);
  }
}
