import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { $Enums, DailySchedule } from "@prisma/client";

@ApiSchema({
	description: "A daily schedule object",
})
export class DailyScheduleEntity implements DailySchedule {
	constructor(partial: Partial<DailyScheduleEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The ApiProperty decorator is used here
	 * only to change the order of `id` and `day`
	 * since `day` appears first in the Swagger UI
	 */
	/**
	 * The daily schedule's unique identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@ApiProperty()
	id: string;

	/**
	 * The daily schedule's day
	 * @example "MONDAY"
	 */
	@ApiProperty({ enum: $Enums.Day })
	day: $Enums.Day;

	/**
	 * The daily schedule's class identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	classId: string;

	/**
	 * The time the daily schedule was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the daily schedule was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the daily schedule has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the daily schedule was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
