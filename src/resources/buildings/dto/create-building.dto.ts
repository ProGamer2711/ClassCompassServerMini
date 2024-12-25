import { ApiSchema } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new building",
})
export class CreateBuildingDto {
	/**
	 * The building's name.
	 * @example "Building A"
	 */
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * The building's school identifier.
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	schoolId: string;
}
