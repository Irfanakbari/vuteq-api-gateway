import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { catchError, throwError } from 'rxjs';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  createCustomer(data: CreateCustomerDto) {
    return this.client
      .send('createCustomer', data)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAllCustomer() {
    return this.client.send('findAllCustomer', {});
  }

  deleteCustomer(id: string) {
    return this.client
      .send('removeCustomer', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  update(data: UpdateCustomerDto, id: string) {
    return this.client
      .send('updateCustomer', {
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
