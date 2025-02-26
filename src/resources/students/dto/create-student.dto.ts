import { ApiSchema } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

@ApiSchema({
	description: "The data required to create a new student",
})
export class CreateStudentDto {
	/**
	 * The student's user identifier.
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	userId: string;

	/**
	 * The student's class identifier.
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	classId: string;
}
