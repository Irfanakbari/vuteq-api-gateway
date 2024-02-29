import { PartialType } from '@nestjs/mapped-types';
import { CreatePartDto } from './create-part.dto';
import { IsString } from 'class-validator';

export class UpdatePartDto extends PartialType(CreatePartDto) {
  @IsString()
  id: string;
}
