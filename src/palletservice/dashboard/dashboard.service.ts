import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Injectable()
export class DashboardService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  findAll(user: UserInfo) {
    return this.client.send('findAllDashboard', user);
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }
}
