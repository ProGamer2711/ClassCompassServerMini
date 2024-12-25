import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { FloorsService } from "src/floors/floors.service";

@Injectable()
export class RoomsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly floorsService: FloorsService
	) {}

	async create(createRoomDto: CreateRoomDto) {
		// check the floor exists
		// if it doesn't, Prisma will throw an error
		await this.floorsService.findOne(createRoomDto.floorId);

		return this.prisma.client.room.create({
			data: createRoomDto,
		});
	}

	async findAllByFloor(floorId: string) {
		// check the floor exists
		// if it doesn't, Prisma will throw an error
		await this.floorsService.findOne(floorId);

		return this.prisma.client.room.findMany({
			where: { floorId },
		});
	}

	findOne(id: string) {
		return this.prisma.client.room.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateRoomDto: UpdateRoomDto) {
		if (updateRoomDto.floorId) {
			// check the floor exists
			// if it doesn't, Prisma will throw an error
			await this.floorsService.findOne(updateRoomDto.floorId);
		}

		return this.prisma.client.room.update({
			where: { id },
			data: updateRoomDto,
		});
	}

	remove(id: string) {
		return this.prisma.client.room.softDelete({
			where: { id },
		});
	}
}
