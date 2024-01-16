import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  @IsNotEmpty()
  kode: string;

  // delivery_kode: string;

  @IsNotEmpty()
  destination: string;
}
