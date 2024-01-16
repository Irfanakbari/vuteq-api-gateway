import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateHistoryDto } from './dto/create-history.dto';
import { catchError, throwError } from 'rxjs';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Injectable()
export class HistoryService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createHistory(data: CreateHistoryDto, user: UserInfo) {
    return this.client
      .send('createHistory', {
        ...data,
        operator: user.preferred_username,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllHistory(
    query: {
      customer: string;
      vehicle: string;
      keluarStart: string;
      keluarEnd: string;
      masukStart: string;
      masukEnd: string;
      search: string;
      part: string;
      status: string;
      page: string;
      limit: string;
    },
    user: UserInfo,
  ) {
    return this.client.send('findAllHistory', {
      query,
      user,
    });
  }

  updateHistory(data: UpdateHistoryDto, operator: string) {
    return this.client
      .send('updateHistory', {
        ...data,
        operator: operator,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
