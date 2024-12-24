import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateBuildingDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty()
	schoolId: string;
}
