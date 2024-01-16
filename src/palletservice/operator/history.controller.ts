import { Controller, Get } from '@nestjs/common';
import { HistoryOpService } from './history.service';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Controller({
  path: 'pallet/operator',
})
export class HistoryOpController {
  constructor(private historyService: HistoryOpService) {}
  @Get('history')
  @Roles({ roles: ['operator'] })
  getOperatorHistory(@AuthenticatedUser() user: UserInfo) {
    return this.historyService.getOperatorHistory(user);
  }
}
