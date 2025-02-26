import { ApiSchema, PartialType } from "@nestjs/swagger";

import { CreateRoleDto } from "./create-role.dto";

@ApiSchema({
	description: "The data required to update a role",
})
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
