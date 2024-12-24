import { ApiProperty } from "@nestjs/swagger";
import {
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";

export class CreateFloorDto {
	@IsNumber()
	@ApiProperty()
	number: number;

	@IsString()
	@IsOptional()
	@IsNotEmpty()
	@ApiProperty({
		required: false,
	})
	description?: string;

	@IsString()
	@IsOptional()
	@IsNotEmpty()
	@ApiProperty({
		required: false,
	})
	planFilename?: string;

	@IsString()
	@IsOptional()
	@IsNotEmpty()
	@ApiProperty({
		required: false,
	})
	maskFilename?: string;

	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty()
	buildingId: string;
}
