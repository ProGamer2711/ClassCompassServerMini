import { ApiSchema, PartialType } from "@nestjs/swagger";

import { CreateClassDto } from "./create-class.dto";

@ApiSchema({
	description: "The data required to update a class",
})
export class UpdateClassDto extends PartialType(CreateClassDto) {}
