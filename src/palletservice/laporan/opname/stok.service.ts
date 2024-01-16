import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OpnameService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  getAllOpname() {
    return this.client.send('findAllOpname', {});
  }
}
