import { IsNotEmpty } from 'class-validator';

export class CreateStockopnameDto {
  @IsNotEmpty()
  catatan: string;
}
