import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateStockopnameDto } from './dto/create-stockopname.dto';
import { catchError, throwError } from 'rxjs';
import { UpdateStockopnameDto } from './dto/update-stockopname.dto';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Injectable()
export class StockopnameService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createStockOpname(data: CreateStockopnameDto, user: UserInfo) {
    return this.client
      .send('createStockOpname', {
        createStockopnameDto: data,
        user: user,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllStockOpname() {
    return this.client
      .send('findAllStockOpname', {})
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  deleteStockOpname(id: string) {
    return this.client
      .send('removeStockOpname', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  updateStockOpname(data: UpdateStockopnameDto, id: string) {
    return this.client
      .send('updateStockOpname', {
        data,
        id,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
