import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SocketService {
  constructor(@Inject('ANSEI_SERVICE') private client: ClientProxy) {}

  async dashboard() {
    return await firstValueFrom(this.client.send('dashboard', {}));
  }
}
