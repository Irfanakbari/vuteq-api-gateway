import { PartialType } from '@nestjs/mapped-types';
import { CreateStockopnameDto } from './create-stockopname.dto';
import { IsNumber } from 'class-validator';

export class UpdateStockopnameDto extends PartialType(CreateStockopnameDto) {
  @IsNumber()
  status: number;
}
