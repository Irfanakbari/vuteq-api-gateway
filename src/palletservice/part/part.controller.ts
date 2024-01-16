import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { PartService } from './part.service';
import { Roles } from 'nest-keycloak-connect';

// @UseGuards(AuthSuperGuard)
@Controller({
  path: 'pallet/parts',
})
export class PartController {
  constructor(private partService: PartService) {}
  @Get()
  @Roles({ roles: ['admin', 'super'] })
  getPart() {
    return this.partService.getAllPart();
  }

  @Post()
  @Roles({ roles: ['super'] })
  createPart(@Body() data: CreatePartDto) {
    return this.partService.createVPart(data);
  }

  @Delete(':id')
  @Roles({ roles: ['super'] })
  deletePart(@Param('id') id: string) {
    return this.partService.deletePart(id);
  }
}
