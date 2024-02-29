import { IsNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  part_type: string;

  @IsNotEmpty()
  part_number: string;

  @IsNotEmpty()
  part_name: string;

  @IsNotEmpty()
  supplier: string;
}
