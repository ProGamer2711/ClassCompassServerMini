import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";

import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";

import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@decorators/index";

import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

import { RoomEntity } from "./entities/room.entity";

import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	/**
	 * Create a new room
	 */
	@Post()
	@ApiPost({ type: RoomEntity })
	async create(@Body() createRoomDto: CreateRoomDto) {
		return new RoomEntity(await this.roomsService.create(createRoomDto));
	}

	/**
	 * Get all rooms for a floor
	 */
	@Get("floor/:floorId")
	@ApiGet({ type: [RoomEntity] })
	async findAllByFloor(
		@Param("floorId", ObjectIdValidationPipe) floorId: string
	) {
		const rooms = await this.roomsService.findAllByFloor(floorId);

		return rooms.map(room => new RoomEntity(room));
	}

	/**
	 * Get a room by ID
	 */
	@Get(":id")
	@ApiGet({ type: RoomEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new RoomEntity(await this.roomsService.findOne(id));
	}

	/**
	 * Update a room by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: RoomEntity })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateRoomDto: UpdateRoomDto
	) {
		return new RoomEntity(
			await this.roomsService.update(id, updateRoomDto)
		);
	}

	/**
	 * Delete a room by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: RoomEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new RoomEntity(await this.roomsService.remove(id));
	}
}
