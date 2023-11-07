import { Inject, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { catchError, throwError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Injectable()
export class HistoriesService {
  constructor(@Inject('HPM_DLV_SERVICE') private client: ClientProxy) {}
  create(createHistoryDto: CreateHistoryDto, user: UserInfo) {
    return this.client
      .send('createHistory', {
        ...createHistoryDto,
        operator: user.preferred_username,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  findAll(pageNumber?: number, pageSize?: number) {
    return this.client
      .send('findAllHistories', {
        pageNumber,
        pageSize,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  createFailed(createHistoryDto: CreateHistoryDto, user: any) {
    return this.client
      .send('createHistoryFailed', {
        ...createHistoryDto,
        operator: user.preferred_username,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
