import { ApiSchema } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new teacher",
})
export class CreateTeacherDto {
	/**
	 * The teacher's name
	 * @example "John Doe"
	 */
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * The teacher's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	schoolId: string;

	/**
	 * The teacher's subject identifiers
	 * @example ["507f191e810c19729de860ea", "507f191e810c19729de860eb"]
	 */
	@IsOptional()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@IsMongoId({ each: true })
	subjectIds?: string[];
}
