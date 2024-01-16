import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePalletDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  part: string;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  jenis?: string;
}
