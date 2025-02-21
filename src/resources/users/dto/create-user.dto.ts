import { ApiSchema } from "@nestjs/swagger";
import {
	IsEmail,
	IsMongoId,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
} from "class-validator";

@ApiSchema({
	description: "The data required to create a new user",
})
export class CreateUserDto {
	/**
	 * The user's name
	 * @example "John Doe"
	 */
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * The user's email
	 * @example "johndoe@example.com"
	 */
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	/**
	 * The user's unhashed password
	 * @example "password"
	 */
	@IsString()
	@IsNotEmpty()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;

	/**
	 * The user's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	schoolId: string;
}
