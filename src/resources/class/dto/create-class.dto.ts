import { ApiSchema } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new class",
})
export class CreateClassDto {
	/**
	 * The class's name.
	 * @example "Class A"
	 */
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * The class's school identifier.
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	schoolId: string;
}
