import { ApiSchema } from "@nestjs/swagger";
import { Room } from "@prisma/client";

@ApiSchema({
	description: "A room object",
})
export class RoomEntity implements Room {
	constructor(partial: Partial<RoomEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The room's unique identifier
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	id: string;

	/**
	 * The room's name
	 * @example "Room 101"
	 */
	name: string;

	/**
	 * The room's floor identifier
	 * @example "507f191e810c19729de860ea"
	 */
	floorId: string;

	/**
	 * The time the room was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the room was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the room has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the room was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
