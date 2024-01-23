import { IsNotEmpty } from 'class-validator';

export class CheckHistoryDto {
  // @IsNotEmpty()
  // id: string;

  @IsNotEmpty()
  po_number: string;

  @IsNotEmpty()
  part_number: string;
}
