import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
  kode_delivery: string;

  @IsNotEmpty()
  @IsNumber()
  total_pallet: number;

  @IsNotEmpty()
  no_pol: string;

  @IsNotEmpty()
  sopir: string;

  tanggal_delivery: any;

  @IsNotEmpty()
  part: string;
}
