import { IsNotEmpty } from 'class-validator';

export class CreateEmailsDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;
}
