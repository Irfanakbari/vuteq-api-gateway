import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { catchError, throwError } from 'rxjs';
import { UserInfo } from '../../interfaces/userinfo.interface';

@Injectable()
export class VehicleService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createVehicle(data: CreateVehicleDto) {
    return this.client
      .send('createVehicle', data)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllVehicle(user: UserInfo) {
    return this.client
      .send('findAllVehicle', user)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  deleteVehicle(id: string) {
    return this.client
      .send('removeVehicle', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
