import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInfo } from '../../../interfaces/userinfo.interface';

@Injectable()
export class MaintenanceService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  getAllStok(user: UserInfo) {
    return this.client.send('findAllMaintenance', user);
  }
}
