import { ApiSchema, PartialType } from "@nestjs/swagger";

import { CreateUserDto } from "./create-user.dto";

@ApiSchema({
	description: "The data required to update a user",
})
export class UpdateUserDto extends PartialType(CreateUserDto) {}
