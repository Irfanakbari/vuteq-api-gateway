import {IsNotEmpty} from "class-validator";

export class CreateRepairDto {
    @IsNotEmpty()
    kode_pallet:string
}
