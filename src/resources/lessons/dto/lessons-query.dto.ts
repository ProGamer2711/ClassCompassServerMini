import { ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsDate,
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
	roomId?: string;

	/**
	 * The lesson's teacher identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	teacherId?: string;

	/**
	 * The lesson's class identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	classId?: string;
}
