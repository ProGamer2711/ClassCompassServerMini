import { ApiSchema } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new role",
})
export class CreateRoleDto {
	/**
	 * The role's name
	 * @example "Admin"
	 */
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * The role's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	schoolId: string;

	/**
	 * The role's attributes
	 * @example ["subjects:read", "dailySchedule:update"]
	 * @default []
	 */
	@IsOptional()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	// TODO: Add validation for attributes
	attributes?: string[];

	/**
	 * The role's user identifiers
	 * @example ["507f191e810c19729de860ea", "507f191e810c19729de860eb"]
	 * @default []
	 */
	@IsOptional()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@IsMongoId({ each: true })
	userIds?: string[];
}
