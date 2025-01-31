import { ApiSchema } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new student",
})
export class CreateStudentDto {
	/**
	 * The student's name.
	 * @example "John Doe"
	 */
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * The student's class identifier.
	 * @example "507c7f79bcf86cd7994f6c0e"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	classId: string;
}
