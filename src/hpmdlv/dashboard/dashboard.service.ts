import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(@Inject('HPM_DLV_SERVICE') private client: ClientProxy) {}

  findAll() {
    return this.client
      .send('findAllDashboard', {})
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
