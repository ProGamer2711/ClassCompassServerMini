import { forwardRef, Inject, Injectable } from "@nestjs/common";
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
		@Inject(forwardRef(() => RoomsService))
		private readonly roomsService: RoomsService,
		@Inject(forwardRef(() => TeachersService))
		private readonly teachersService: TeachersService,
		private readonly subjectsService: SubjectsService,
		@Inject(forwardRef(() => DailySchedulesService))
		private readonly dailySchedulesService: DailySchedulesService
	) {}

	async create(createLessonDto: CreateLessonDto) {
		await this.roomsService.ensureExists(createLessonDto.roomId);
		await this.teachersService.ensureExists(createLessonDto.teacherId);
		await this.subjectsService.ensureExists(createLessonDto.subjectId);
		await this.dailySchedulesService.ensureExists(
			createLessonDto.dailyScheduleId
		);

		// // Check for conflicting lessons
		// await this.roomsService.ensureFreeAtTimeRange(createLessonDto);
		// await this.teachersService.ensureFreeAtTimeRange(createLessonDto);
		// await this.dailySchedulesService.ensureFreeAtTimeRange(createLessonDto);

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

	async findAllByQuery({ time, classId, ...parameters }: LessonsQueryDto) {
		const baseTimeDate = set(new Date(0), {
			hours: time.getHours(),
			minutes: time.getMinutes(),
			seconds: time.getSeconds(),
		});

		const day = format(time, "EEEE").toLowerCase() as $Enums.Day;

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
					classId,
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
		// const lesson = await this.findOne(id);

		if (updateLessonDto.roomId) {
			await this.roomsService.ensureExists(updateLessonDto.roomId);
			// // Check for conflicting lessons for the new room
			// await this.roomsService.ensureFreeAtTimeRange({
			// 	...lesson,
			// 	...updateLessonDto,
			// });
		}

		if (updateLessonDto.teacherId) {
			await this.teachersService.ensureExists(updateLessonDto.teacherId);
			// // Check for conflicting lessons for the new teacher
			// await this.teachersService.ensureFreeAtTimeRange({
			// 	...lesson,
			// 	...updateLessonDto,
			// });
		}

		if (updateLessonDto.subjectId) {
			await this.subjectsService.ensureExists(updateLessonDto.subjectId);
		}

		if (updateLessonDto.dailyScheduleId) {
			await this.dailySchedulesService.ensureExists(
				updateLessonDto.dailyScheduleId
			);
			// // Check for conflicting lessons for the new daily schedule
			// await this.dailySchedulesService.ensureFreeAtTimeRange({
			// 	...lesson,
			// 	...updateLessonDto,
			// });
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
