import { ApiSchema } from "@nestjs/swagger";
import { Floor } from "@prisma/client";

@ApiSchema({
	description: "A floor object",
})
export class FloorEntity implements Floor {
	constructor(partial: Partial<FloorEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The floor's unique identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	id: string;

	/**
	 * The floor's number
	 * @example 1
	 */
	number: number;

	/**
	 * The floor's description
	 * @example "First floor"
	 * @default null
	 */
	description: string | null = null;

	/**
	 * The floor's plan filename
	 * @example "floor-plan.png"
	 * @default null
	 */
	planFilename: string | null = null;

	/**
	 * The floor's mask filename
	 * @example "floor-mask.svg"
	 * @default null
	 */
	maskFilename: string | null = null;

	/**
	 * The floor's building identifier
	 * @example "507f191e810c19729de860ea"
	 */
	buildingId: string;

	/**
	 * The time the floor was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the floor was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the floor has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the floor was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
