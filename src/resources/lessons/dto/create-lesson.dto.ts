import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
	IsDate,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsString,
	Min,
} from "class-validator";
import { set } from "date-fns";

@ApiSchema({
	description: "The data required to create a new lesson",
})
export class CreateLessonDto {
	/**
	 * The lesson's number
	 * @example 1
	 */
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	@ApiProperty()
	lessonNumber: number;

	/**
	 * The lesson's start time.
	 * The date part will be ignored and only time will be used
	 * @example "2021-09-01T08:00:00.000Z"
	 */
	@IsDate()
	@IsNotEmpty()
	@ApiProperty()
	@Type(() => Date)
	@Transform(({ value }) =>
		set(new Date(0), {
			hours: value.getHours(),
			minutes: value.getMinutes(),
			seconds: value.getSeconds(),
		})
	)
	startTime: Date;

	/**
	 * The lesson's end time.
	 * The date part will be ignored and only time will be used
	 * @example "2021-09-01T09:00:00.000Z"
	 */
	@IsDate()
	@IsNotEmpty()
	@ApiProperty()
	@Type(() => Date)
	@Transform(({ value }) =>
		set(new Date(0), {
			hours: value.getHours(),
			minutes: value.getMinutes(),
			seconds: value.getSeconds(),
		})
	)
	endTime: Date;

	/**
	 * The lesson's weeks
	 * @example "odd"
	 * @default "all"
	 */
	@IsString()
	@IsNotEmpty()
	@IsEnum($Enums.LessonWeek)
	@ApiProperty({ enum: $Enums.LessonWeek })
	lessonWeek?: $Enums.LessonWeek = "all";

	/**
	 * The lesson's room identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	roomId: string;

	/**
	 * The lesson's teacher identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	teacherId: string;

	/**
	 * The lesson's subject identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	subjectId: string;

	/**
	 * The lesson's daily schedule identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	dailyScheduleId: string;
}
