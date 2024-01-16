import { IsNotEmpty } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  customer: string;

  @IsNotEmpty()
  department: string;
}
