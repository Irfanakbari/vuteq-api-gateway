import { IsNotEmpty } from 'class-validator';

export class CheckHistoryDto {
  // @IsNotEmpty()
  // id: string;

  @IsNotEmpty()
  po_id: string;

  // @IsNotEmpty()
  // part_number: string;
}
