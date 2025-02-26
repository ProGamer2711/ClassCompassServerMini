import { ApiSchema } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

@ApiSchema({
	description: "A user object",
})
export class UserEntity implements User {
	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial);
	}

	/**
	 * The user's unique identifier
	 * @example "507f191e810c19729de860ea"
	 */
	id: string;

	/**
	 * The user's name
	 * @example "John Doe"
	 */
	name: string;

	/**
	 * The user's email
	 * @example "johndoe@example.com"
	 */
	email: string;

	/**
	 * The user's hashed password
	 * @example "$2a$12$jxKQe.UECEK7URuSJ76h0uVnut14HePh2rvVFtz0cWnysbfcihGaa"
	 */
	@Exclude()
	password: string;

	/**
	 * The user's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	schoolId: string;

	/**
	 * The user's role identifiers
	 * @example ["507f191e810c19729de860ea", "507f191e810c19729de860eb"]
	 * @default []
	 */
	roleIds: string[] = [];

	/**
	 * The time the user was created
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	createdAt: Date;

	/**
	 * The time the user was last updated
	 * @example "2021-09-01T00:00:00.000Z"
	 */
	updatedAt: Date;

	/**
	 * Whether the user has been deleted
	 * @example false
	 * @default false
	 */
	deleted: boolean = false;

	/**
	 * The time the user was deleted
	 * @example "2021-09-01T00:00:00.000Z"
	 * @default null
	 */
	deletedAt: Date | null = null;
}
