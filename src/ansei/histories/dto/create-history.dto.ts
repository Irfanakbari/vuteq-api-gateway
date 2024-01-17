import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  // @IsNotEmpty()
  // id: string;

  @IsNotEmpty()
  part_number: string;
}
