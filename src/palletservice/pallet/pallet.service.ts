import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreatePalletDto } from './dto/create-pallet.dto';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class PalletService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createPallet(data: CreatePalletDto) {
    return this.client
      .send('createPallet', data)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllPallet(data: any) {
    return this.client.send('findAllPallet', data);
  }

  deletePallet(id: string) {
    return this.client
      .send('removePallet', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  deleteBatchPallet(data: { palletsToDelete: string[] }) {
    return this.client
      .send('removePalletBatch', data.palletsToDelete)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
