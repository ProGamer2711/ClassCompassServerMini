import { ApiSchema, PartialType } from "@nestjs/swagger";
import { CreateRoomDto } from "./create-room.dto";

@ApiSchema({
	description: "The data required to update a room",
})
export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
