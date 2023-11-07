import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Injectable()
export class HistoryOpService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  getOperatorHistory(user: UserInfo) {
    return this.client
      .send('findAllHistoryOp', user)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
