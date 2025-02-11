import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { Type } from "class-transformer";
import {
	IsDate,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

@ApiSchema({
	description:
		"The query parameters for finding lessons by time and room/teacher/class ID",
})
export class LessonsQueryDto {
	/**
	 * The lesson's time (between start and end time)
	 * @example "2021-09-01T09:00:00.000Z"
	 */
	@IsDate()
	@IsNotEmpty()
	@ApiProperty()
	@Type(() => Date)
	time: Date;

	/**
	 * The lesson's room identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty()
	roomId?: string;

	/**
	 * The lesson's teacher identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty()
	teacherId?: string;

	/**
	 * The lesson's daily schedule identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty()
	dailyScheduleId?: string;

	/**
	 * The lesson's class identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty()
	classId?: string;

	/**
	 * The lesson's weeks
	 * @example "odd"
	 */
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsEnum($Enums.LessonWeek)
	@ApiProperty({ enum: $Enums.LessonWeek })
	lessonWeek?: $Enums.LessonWeek;
}
