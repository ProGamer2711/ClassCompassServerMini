import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
} from "@nestjs/common";
import { $Enums } from "@prisma/client";

import { FloorsService } from "@resources/floors/floors.service";
import { LessonsService } from "@resources/lessons/lessons.service";

import { PrismaService } from "@prisma/prisma.service";

import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Injectable()
export class RoomsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly floorsService: FloorsService,
		@Inject(forwardRef(() => LessonsService))
		private readonly lessonsService: LessonsService
	) {}

	async create(createRoomDto: CreateRoomDto) {
		await this.floorsService.ensureExists(createRoomDto.floorId);

		return this.prisma.client.room.create({
			data: createRoomDto,
		});
	}

	async findAllByFloor(floorId: string) {
		await this.floorsService.ensureExists(floorId);

		return this.prisma.client.room.findMany({
			where: { floorId },
		});
	}

	async findOne(id: string) {
		return this.prisma.client.room.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateRoomDto: UpdateRoomDto) {
		if (updateRoomDto.floorId) {
			await this.floorsService.ensureExists(updateRoomDto.floorId);
		}

		return this.prisma.client.room.update({
			where: { id },
			data: updateRoomDto,
		});
	}

	async remove(id: string) {
		return this.prisma.client.room.softDelete({
			where: { id },
		});
	}

	async ensureExists(id: string) {
		await this.prisma.client.room.ensureExists(id);
	}

	async ensureFreeAtTimeRange({
		roomId,
		startTime,
		endTime,
		lessonWeek = "all",
	}: {
		roomId: string;
		startTime: Date;
		endTime: Date;
		lessonWeek?: $Enums.LessonWeek;
		[key: string]: any;
	}) {
		const lessonsOverlappingStartTime =
			await this.lessonsService.findAllByQuery({
				time: startTime,
				roomId,
				lessonWeek,
			});

		if (lessonsOverlappingStartTime.length > 0) {
			throw new BadRequestException(
				"Room is already busy at the specified start time"
			);
		}

		const lessonsOverlappingEndTime =
			await this.lessonsService.findAllByQuery({
				time: endTime,
				roomId,
				lessonWeek,
			});

		if (lessonsOverlappingEndTime.length > 0) {
			throw new BadRequestException(
				"Room is already busy at the specified end time"
			);
		}
	}
}
