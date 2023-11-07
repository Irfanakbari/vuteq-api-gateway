import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { CreateDestinationDto } from './dto/create-destination.dto';

@Injectable()
export class DestinationService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createDestination(data: CreateDestinationDto) {
    return this.client
      .send('createDestination', data)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllDestination() {
    return this.client.send('findAllDestination', {});
  }

  deleteDestination(id: number) {
    return this.client
      .send('removeDestination', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  updateDestination(id: number, data: UpdateDestinationDto) {
    return this.client
      .send('updateDestination', {
        id,
        data,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
