import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new daily schedule",
})
export class CreateDailyScheduleDto {
	/**
	 * The daily schedule's day.
	 * @example "MONDAY"
	 */
	@IsString()
	@IsNotEmpty()
	@IsEnum($Enums.Day)
	@ApiProperty({ enum: $Enums.Day })
	day: $Enums.Day;

	/**
	 * The daily schedule's class identifier.
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	classId: string;
}
