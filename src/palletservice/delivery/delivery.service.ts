import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { catchError, throwError } from 'rxjs';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Injectable()
export class DeliveryService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createDelivery(data: CreateDeliveryDto) {
    return this.client
      .send('createDelivery', data)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllDelivery(user: UserInfo) {
    return this.client.send('findAllDeliveries', user);
  }

  deleteDelivery(id: string) {
    return this.client
      .send('removeDelivery', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  updateDelivery(data: UpdateDeliveryDto, id: string) {
    return this.client
      .send('updateDelivery', {
        ...data,
        id,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getOneDelivery(id: string) {
    return this.client
      .send('findOneDelivery', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
