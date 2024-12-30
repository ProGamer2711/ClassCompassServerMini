import { ApiSchema } from "@nestjs/swagger";
import { Subject } from "@prisma/client";

@ApiSchema({
	description: "A subject object",
})
export class SubjectEntity implements Subject {
	constructor(partial: Partial<SubjectEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The subject's unique identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	id: string;

	/**
	 * The subject's name
	 * @example "Math"
	 */
	name: string;

	/**
	 * The subject's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	schoolId: string;

	/**
	 * The subject's teacher identifiers
	 * @example ["507f191e810c19729de860ea", "507f191e810c19729de860eb"]
	 */
	teacherIds: string[];

	/**
	 * The time the subject was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the subject was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the subject has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the subject was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
