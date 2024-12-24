import { ApiSchema } from "@nestjs/swagger";
import { Building } from "@prisma/client";

@ApiSchema({
	description: "A building object.",
})
export class BuildingEntity implements Building {
	constructor(partial: Partial<BuildingEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The building's unique identifier.
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	id: string;

	/**
	 * The building's name.
	 * @example "Building A"
	 */
	name: string;

	/**
	 * The building's school identifier.
	 * @example "507f191e810c19729de860ea"
	 */
	schoolId: string;

	/**
	 * The time the building was created.
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the building was last updated.
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the building has been deleted.
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the building was deleted.
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
