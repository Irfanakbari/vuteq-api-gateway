import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  @IsNotEmpty()
  kode: string;

  @IsNotEmpty()
  delivery_kode: string;

  destination?: string;
}
