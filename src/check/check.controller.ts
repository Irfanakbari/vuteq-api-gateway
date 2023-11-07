import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/Auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('check')
export class CheckController {
  @UseGuards(AuthGuard)
  @Get()
  greeting(@User() user: any) {
    return user;
  }
}
