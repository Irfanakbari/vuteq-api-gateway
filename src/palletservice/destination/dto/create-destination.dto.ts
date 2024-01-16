import { IsNotEmpty } from 'class-validator';

export class CreateDestinationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  part: string;
}
