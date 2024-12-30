import { ApiSchema } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new subject",
})
export class CreateSubjectDto {
	/**
	 * The subject's name
	 * @example "Math"
	 */
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * The subject's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	schoolId: string;

	/**
	 * The subject's teacher identifiers
	 * @example ["507f191e810c19729de860ea", "507f191e810c19729de860eb"]
	 */
	@IsOptional()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@IsMongoId({ each: true })
	teacherIds?: string[];
}
