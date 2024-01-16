import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

@Controller('hpmdlv/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.ordersService.create(file);
  }

  @Get()
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  findAll(
    @Query('page') pageNumber?: number,
    @Query('limit') pageSize?: number,
  ) {
    return this.ordersService.findAll(pageNumber ?? 1, pageSize ?? 100);
  }

  @Get(':id')
  @Roles({ roles: ['hpm-dlv-system:operator'], mode: RoleMatchingMode.ANY })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
