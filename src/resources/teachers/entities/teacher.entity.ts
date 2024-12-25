import { ApiSchema } from "@nestjs/swagger";
import { Teacher } from "@prisma/client";

@ApiSchema({
	description: "A teacher object",
})
export class TeacherEntity implements Teacher {
	constructor(partial: Partial<TeacherEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The teacher's unique identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	id: string;

	/**
	 * The teacher's name
	 * @example "John Doe"
	 */
	name: string;

	/**
	 * The teacher's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	schoolId: string;

	/**
	 * The teacher's subject identifiers
	 * @example ["507f191e810c19729de860ea", "507f191e810c19729de860eb"]
	 */
	subjectIds: string[];

	/**
	 * The time the teacher was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the teacher was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the teacher has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the teacher was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
