import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  // @IsNotEmpty()
  // id: string;

  // @IsNotEmpty()
  // po_no: string;

  @IsNotEmpty()
  part_no: string;

  @IsNotEmpty()
  po_id: string;
}
