import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Injectable()
export class DashboardService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  findAll(user: UserInfo) {
    return this.client.send('findAllDashboard', user);
  }

  findOne(id: string, user: UserInfo) {
    return this.client.send('findOneSlowmove', {
      id,
      user,
    });
  }
}
