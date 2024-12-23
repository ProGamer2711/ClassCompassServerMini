import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSchoolDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;
}
