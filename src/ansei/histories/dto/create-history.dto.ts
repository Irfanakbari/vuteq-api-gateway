import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  // @IsNotEmpty()
  // id: string;

  @IsNotEmpty()
  po_number: string;
}
