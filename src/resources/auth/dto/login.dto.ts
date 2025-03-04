import { ApiSchema } from "@nestjs/swagger";
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	MaxLength,
} from "class-validator";

@ApiSchema({
	description: "The data required to log in a user",
})
export class LoginDto {
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
	@MaxLength(64)
	password: string;
}
