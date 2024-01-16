import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStockopnameDto } from './dto/create-stockopname.dto';
import { StockopnameService } from './stockopname.service';
import { UpdateStockopnameDto } from './dto/update-stockopname.dto';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserInfo } from '../../interfaces/userinfo.interface';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/stockopname',
})
export class StockopnameController {
  constructor(private stockopnameService: StockopnameService) {}
  @Get()
  @Roles({ roles: ['super'] })
  getAllStockOpname() {
    return this.stockopnameService.getAllStockOpname();
  }

  @Post()
  @Roles({ roles: ['super'] })
  createStockOpname(
    @Body() data: CreateStockopnameDto,
    @AuthenticatedUser() user: UserInfo,
  ) {
    return this.stockopnameService.createStockOpname(data, user);
  }

  @Patch(':id')
  @Roles({ roles: ['super'] })
  updateStockOpname(
    @Body() data: UpdateStockopnameDto,
    @Param('id') id: string,
  ) {
    return this.stockopnameService.updateStockOpname(data, id);
  }

  @Delete(':id')
  @Roles({ roles: ['super'] })
  deleteStockOpname(@Param('id') id: string) {
    return this.stockopnameService.deleteStockOpname(id);
  }
}
