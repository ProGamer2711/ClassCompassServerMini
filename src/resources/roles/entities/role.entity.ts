import { ApiSchema } from "@nestjs/swagger";
import { Role } from "@prisma/client";

@ApiSchema({
	description: "A role object",
})
export class RoleEntity implements Role {
	constructor(partial: Partial<RoleEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The role's unique identifier
	 * @example "507f191e810c19729de860ea"
	 */
	id: string;

	/**
	 * The role's name
	 * @example "Admin"
	 */
	name: string;

	/**
	 * The role's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	schoolId: string;

	/**
	 * The role's attributes
	 * @example ["subjects:read", "dailySchedule:update"]
	 * @default []
	 */
	attributes: string[] = [];

	/**
	 * The role's user identifiers
	 * @example ["507f191e810c19729de860ea", "507f191e810c19729de860eb"]
	 * @default []
	 */
	userIds: string[] = [];

	/**
	 * The time the role was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the role was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the role has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the role was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
