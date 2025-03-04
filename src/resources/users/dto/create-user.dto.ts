import { ApiSchema } from "@nestjs/swagger";
import {
	IsEmail,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
	MaxLength,
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
	// TODO: Test this with a password that is too long and check if hashes might match (only the first 72 bytes are hashed)
	@MaxLength(64)
	password: string;

	/**
	 * The user's school identifier
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	schoolId: string;

	/**
	 * The user's role identifiers
	 * @example ["507f191e810c19729de860ea", "507f191e810c19729de860eb"]
	 */
	@IsOptional()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@IsMongoId({ each: true })
	roleIds?: string[];
}
