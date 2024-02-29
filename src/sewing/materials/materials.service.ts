import { Inject, Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class MaterialsService {
  constructor(@Inject('SEWING_SERVICE') private client: ClientProxy) {}

  create(createMaterialDto: CreateMaterialDto) {
    return this.client
      .send('createMaterial', createMaterialDto)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  findAll(pageNumber?: number, pageSize?: number) {
    return this.client
      .send('findAllMaterials', {
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
      .send('findOneMaterial', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  update(id: string, updateMaterialDto: UpdateMaterialDto) {
    return this.client
      .send('updateMaterial', { ...updateMaterialDto, id })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  remove(id: string) {
    return this.client
      .send('removeMaterial', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
