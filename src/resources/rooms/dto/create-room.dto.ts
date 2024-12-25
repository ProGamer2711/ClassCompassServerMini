import { ApiSchema } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new room",
})
export class CreateRoomDto {
	/**
	 * The room's name
	 * @example "Room 101"
	 */
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * The room's floor identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	floorId: string;
}
