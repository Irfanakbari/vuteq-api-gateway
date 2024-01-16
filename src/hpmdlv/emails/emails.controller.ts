import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CreateEmailsDto } from './dto/create-emails.dto';

@Controller('hpmdlv/emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  create(@Body() createEmailsDto: CreateEmailsDto) {
    return this.emailsService.create(createEmailsDto);
  }

  @Get()
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  findAll() {
    return this.emailsService.findAll();
  }

  @Delete(':id')
  @Roles({ roles: ['hpm-dlv-system:super'], mode: RoleMatchingMode.ANY })
  remove(@Param('id') id: string) {
    return this.emailsService.remove(id);
  }
}
