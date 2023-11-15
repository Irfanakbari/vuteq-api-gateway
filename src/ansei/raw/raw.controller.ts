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
import { RawService } from './raw.service';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ansei/raw')
export class RawController {
  constructor(private readonly rawService: RawService) {}

  @Post()
  @Roles({ roles: ['ansei-system:super'], mode: RoleMatchingMode.ANY })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.rawService.create(file);
  }

  @Get()
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  findAll(
    @Query('page') pageNumber?: number,
    @Query('limit') pageSize?: number,
  ) {
    return this.rawService.findAll(pageNumber ?? 1, pageSize ?? 100);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rawService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawService.remove(+id);
  }
}
