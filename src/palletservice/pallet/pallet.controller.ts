import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePalletDto } from './dto/create-pallet.dto';
import { PalletService } from './pallet.service';
import { Roles } from 'nest-keycloak-connect';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/pallets',
})
export class PalletController {
  constructor(private palletService: PalletService) {}
  @Get()
  @Roles({ roles: ['admin', 'super'] })
  getPallet(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('customer') customer: string,
    @Query('vehicle') vehicle: string,
    @Query('part') part: string,
    @Query('search') search: string,
  ) {
    return this.palletService.getAllPallet({
      page,
      limit,
      customer,
      vehicle,
      part,
      search,
    });
  }

  @Post()
  @Roles({ roles: ['admin', 'super'] })
  createPallet(@Body() data: CreatePalletDto) {
    return this.palletService.createPallet(data);
  }

  @Post('batch-delete')
  @Roles({ roles: ['admin', 'super'] })
  deleteBatchPallet(@Body() data: { palletsToDelete: string[] }) {
    return this.palletService.deleteBatchPallet(data);
  }

  @Delete(':id')
  @Roles({ roles: ['admin', 'super'] })
  deletePallet(@Param('id') id: string) {
    return this.palletService.deletePallet(id);
  }
}
