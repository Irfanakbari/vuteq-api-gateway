import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { DestinationService } from './destination.service';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Roles } from 'nest-keycloak-connect';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/destinations',
})
export class DestinationController {
  constructor(private destinationService: DestinationService) {}
  @Get()
  @Roles({ roles: ['admin', 'super'] })
  getDestination() {
    return this.destinationService.getAllDestination();
  }

  @Post()
  @Roles({ roles: ['super'] })
  createDestination(@Body() data: CreateDestinationDto) {
    return this.destinationService.createDestination(data);
  }

  @Delete(':id')
  @Roles({ roles: ['super'] })
  deleteDestination(@Param('id') id: number) {
    return this.destinationService.deleteDestination(id);
  }

  @Get(':kode')
  @Roles({ roles: ['operator'] })
  getOneDestination(@Param('kode') kode: string) {
    return this.destinationService.getOneDestination(kode);
  }

  @Patch(':id')
  @Roles({ roles: ['super'] })
  updateDestination(
    @Param('id') id: number,
    @Body() data: UpdateDestinationDto,
  ) {
    return this.destinationService.updateDestination(id, data);
  }
}
