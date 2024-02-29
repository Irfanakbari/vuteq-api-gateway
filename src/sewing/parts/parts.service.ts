import { Inject, Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class PartsService {
  constructor(@Inject('SEWING_SERVICE') private client: ClientProxy) {}

  create(createPartDto: CreatePartDto) {
    return this.client
      .send('createPart', createPartDto)
      .pipe()
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  findAll(pageNumber?: number, pageSize?: number) {
    return this.client
      .send('findAllParts', {
        pageNumber,
        pageSize,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  findOne(id: string) {
    return this.client
      .send('findOnePart', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  update(id: string, updatePartDto: UpdatePartDto) {
    return this.client
      .send('updatePart', { ...updatePartDto, id })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  remove(id: string) {
    return this.client
      .send('removePart', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
