import {Inject, Injectable} from '@nestjs/common';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {catchError, throwError} from "rxjs";

@Injectable()
export class RepairsService {
  constructor(@Inject('PALLET_SERVICE') private client: ClientProxy) {}

  create(createRepairDto: CreateRepairDto, user: any) {
    return this.client
        .send('createRepair', {
          createRepairDto: createRepairDto,
          user: user
        })
        .pipe(
            catchError((error) =>
                throwError(() => new RpcException(error.response)),
            ),
        );  }

  findAll() {
    return `This action returns all repairs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repair`;
  }

  update(id: number, updateRepairDto: UpdateRepairDto) {
    return `This action updates a #${id} repair`;
  }

  remove(id: number) {
    return `This action removes a #${id} repair`;
  }
}
