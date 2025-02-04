import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { $Enums, Lesson } from "@prisma/client";

@ApiSchema({
	description: "A lesson object",
})
export class LessonEntity implements Lesson {
	constructor(partial: Partial<LessonEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The lesson's unique identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@ApiProperty()
	id: string;

	/**
	 * The lesson's number
	 * @example 1
	 */
	@ApiProperty()
	lessonNumber: number;

	/**
	 * The lesson's start time
	 * @example "2021-09-01T08:00:00.000Z"
	 */
	@ApiProperty()
	startTime: Date;

	/**
	 * The lesson's end time
	 * @example "2021-09-01T09:00:00.000Z"
	 */
	@ApiProperty()
	endTime: Date;

	/**
	 * The lesson's weeks
	 * @example "odd"
	 * @default "all"
	 */
	@ApiProperty({ enum: $Enums.LessonWeek })
	lessonWeeks: $Enums.LessonWeek = "all";

	/**
	 * The lesson's room identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	roomId: string;

	/**
	 * The lesson's teacher identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	teacherId: string;

	/**
	 * The lesson's subject identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	subjectId: string;

	/**
	 * The lesson's group identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	dailyScheduleId: string;

	/**
	 * The time the lesson was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the lesson was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the lesson has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the lesson was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
