import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreatePartDto } from './dto/create-part.dto';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class PartService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createVPart(data: CreatePartDto) {
    return this.client
      .send('createPart', data)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllPart() {
    return this.client.send('findAllPart', {});
  }

  deletePart(id: string) {
    return this.client
      .send('removePart', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
