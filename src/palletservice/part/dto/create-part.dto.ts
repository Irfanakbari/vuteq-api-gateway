import { IsNotEmpty } from 'class-validator';

export class CreatePartDto {
  @IsNotEmpty()
  kode: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  vehicle: string;
}
