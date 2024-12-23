import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBuildingDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsString()
	@ApiProperty()
	schoolId: string;
}
