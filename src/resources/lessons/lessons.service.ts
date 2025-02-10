import { Injectable } from "@nestjs/common";
import { $Enums } from "@prisma/client";
import { format, set } from "date-fns";

import { DailySchedulesService } from "@resources/daily-schedules/daily-schedules.service";
import { RoomsService } from "@resources/rooms/rooms.service";
import { SubjectsService } from "@resources/subjects/subjects.service";
import { TeachersService } from "@resources/teachers/teachers.service";

import { PrismaService } from "@prisma/prisma.service";

import { CreateLessonDto } from "./dto/create-lesson.dto";
import { LessonsQueryDto } from "./dto/lessons-query.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";

@Injectable()
export class LessonsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly roomsService: RoomsService,
		private readonly teachersService: TeachersService,
		private readonly subjectsService: SubjectsService,
		private readonly dailySchedulesService: DailySchedulesService
	) {}

	async create(createLessonDto: CreateLessonDto) {
		await this.roomsService.ensureExists(createLessonDto.roomId);
		await this.teachersService.ensureExists(createLessonDto.teacherId);
		await this.subjectsService.ensureExists(createLessonDto.subjectId);
		await this.dailySchedulesService.ensureExists(
			createLessonDto.dailyScheduleId
		);

		return this.prisma.client.lesson.create({
			data: createLessonDto,
		});
	}

	async findAllByDailySchedule(dailyScheduleId: string) {
		await this.dailySchedulesService.ensureExists(dailyScheduleId);

		return this.prisma.client.lesson.findMany({
			where: { dailyScheduleId },
		});
	}

	async findAllByQuery({ time, ...parameters }: LessonsQueryDto) {
		console.log({ time });

		const baseTimeDate = set(new Date(0), {
			hours: time.getHours(),
			minutes: time.getMinutes(),
			seconds: time.getSeconds(),
		});

		const day = format(time, "EEEE").toLowerCase() as $Enums.Day;

		console.log({ baseTimeDate, day });

		// TODO: Odd/Even week logic may be needed here

		return this.prisma.client.lesson.findMany({
			where: {
				startTime: {
					lte: baseTimeDate,
				},
				endTime: {
					gte: baseTimeDate,
				},
				dailySchedule: {
					day,
				},
				...parameters,
			},
		});
	}

	async findOne(id: string) {
		return this.prisma.client.lesson.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateLessonDto: UpdateLessonDto) {
		if (updateLessonDto.roomId) {
			await this.roomsService.ensureExists(updateLessonDto.roomId);
		}

		if (updateLessonDto.teacherId) {
			await this.teachersService.ensureExists(updateLessonDto.teacherId);
		}

		if (updateLessonDto.subjectId) {
			await this.subjectsService.ensureExists(updateLessonDto.subjectId);
		}

		if (updateLessonDto.dailyScheduleId) {
			await this.dailySchedulesService.ensureExists(
				updateLessonDto.dailyScheduleId
			);
		}

		return this.prisma.client.lesson.update({
			where: { id },
			data: updateLessonDto,
		});
	}

	async remove(id: string) {
		return this.prisma.client.lesson.softDelete({
			where: { id },
		});
	}
}
