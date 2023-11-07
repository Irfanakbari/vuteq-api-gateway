import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { catchError, throwError } from 'rxjs';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createDepartment(data: CreateDepartmentDto) {
    return this.client
      .send('createDepartment', data)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllDepartment() {
    return this.client.send('findAllDepartment', {});
  }

  deleteDepartment(id: string) {
    return this.client
      .send('removeDepartment', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  updateDepartment(data: UpdateDepartmentDto, id: string) {
    return this.client
      .send('updateDepartment', {
        ...data,
        id,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
