import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  @IsNotEmpty()
  id_part: string;

  @IsNotEmpty()
  pcc: string;
}
