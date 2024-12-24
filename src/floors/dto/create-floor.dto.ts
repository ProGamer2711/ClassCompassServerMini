import { ApiSchema } from "@nestjs/swagger";
import {
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";

@ApiSchema({
	description: "The data required to create a new floor.",
})
export class CreateFloorDto {
	/**
	 * The floor's number.
	 * @example 1
	 */
	@IsNumber()
	number: number;

	/**
	 * The floor's description.
	 * @example "First floor"
	 */
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	description?: string;

	/**
	 * The floor's plan filename.
	 * @example "floor-plan.png"
	 */
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	planFilename?: string;

	/**
	 * The floor's mask filename.
	 * @example "floor-mask.svg"
	 */
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	maskFilename?: string;

	/**
	 * The floor's building identifier.
	 * @example "507f191e810c19729de860ea"
	 */
	@IsString()
	@IsNotEmpty()
	@IsMongoId()
	buildingId: string;
}
