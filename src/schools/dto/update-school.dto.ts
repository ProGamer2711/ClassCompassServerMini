import { ApiSchema, PartialType } from "@nestjs/swagger";
import { CreateSchoolDto } from "./create-school.dto";

@ApiSchema({
	description: "The data required to update a school.",
})
export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {}
