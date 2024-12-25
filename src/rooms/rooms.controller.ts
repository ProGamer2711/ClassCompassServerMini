import { Controller, Body, Param } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { ObjectIdValidationPipe } from "src/object-id-validation/object-id-validation.pipe";
import { RoomEntity } from "./entities/room.entity";
import { ApiPost } from "src/api-post/api-post.decorator";
import { ApiGet } from "src/api-get/api-get.decorator";
import { ApiPatch } from "src/api-patch/api-patch.decorator";
import { ApiDelete } from "src/api-delete/api-delete.decorator";

@Controller("rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	/**
	 * Create a new room
	 */
	@ApiPost({ type: RoomEntity })
	async create(@Body() createRoomDto: CreateRoomDto) {
		return new RoomEntity(await this.roomsService.create(createRoomDto));
	}

	/**
	 * Get all rooms for a floor
	 */
	@ApiGet({ type: [RoomEntity], path: "floor/:floorId" })
	async findAllByFloor(
		@Param("floorId", ObjectIdValidationPipe) floorId: string
	) {
		const rooms = await this.roomsService.findAllByFloor(floorId);

		return rooms.map(room => new RoomEntity(room));
	}

	/**
	 * Get a room by ID
	 */
	@ApiGet({ type: RoomEntity, path: ":id" })
	async findOne(@Param("id") id: string) {
		return new RoomEntity(await this.roomsService.findOne(id));
	}

	/**
	 * Update a room by ID
	 */
	@ApiPatch({ type: RoomEntity, path: ":id" })
	async update(
		@Param("id") id: string,
		@Body() updateRoomDto: UpdateRoomDto
	) {
		return new RoomEntity(
			await this.roomsService.update(id, updateRoomDto)
		);
	}

	/**
	 * Delete a room by ID
	 */
	@ApiDelete({ type: RoomEntity, path: ":id" })
	async remove(@Param("id") id: string) {
		return new RoomEntity(await this.roomsService.remove(id));
	}
}
