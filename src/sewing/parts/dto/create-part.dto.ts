import { IsNotEmpty } from 'class-validator';

export class CreatePartDto {
  @IsNotEmpty()
  part_project: string;

  @IsNotEmpty()
  part_no: string;

  @IsNotEmpty()
  part_name: string;

  @IsNotEmpty()
  supplier: string;

  @IsNotEmpty()
  materials: BOMDto[];
}

export class BOMDto {
  material_id: string;
  quantity: number;
  unit: string;
}
