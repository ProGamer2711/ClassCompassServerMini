import { ApiSchema } from "@nestjs/swagger";
import { Class } from "@prisma/client";

@ApiSchema({
	description: "A class object",
})
export class ClassEntity implements Class {
	constructor(partial: Partial<ClassEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The class's unique identifier
	 * @example "507f191e810c19729de860ea"
	 */
	id: string;

	/**
	 * The class's name
	 * @example "Class 11B"
	 */
	name: string;

	/**
	 * The class's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	schoolId: string;

	/**
	 * The time the class was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the class was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the class has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the class was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
