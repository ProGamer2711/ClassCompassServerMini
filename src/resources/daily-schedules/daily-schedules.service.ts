import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
} from "@nestjs/common";
import { $Enums } from "@prisma/client";

import { ClassesService } from "@resources/classes/classes.service";
import { LessonsService } from "@resources/lessons/lessons.service";

import { PrismaService } from "@prisma/prisma.service";

import { CreateDailyScheduleDto } from "./dto/create-daily-schedule.dto";
import { UpdateDailyScheduleDto } from "./dto/update-daily-schedule.dto";

@Injectable()
export class DailySchedulesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly classesService: ClassesService,
		@Inject(forwardRef(() => LessonsService))
		private readonly lessonsService: LessonsService
	) {}

	async create(createDailyScheduleDto: CreateDailyScheduleDto) {
		await this.classesService.ensureExists(createDailyScheduleDto.classId);

		return this.prisma.client.dailySchedule.create({
			data: createDailyScheduleDto,
		});
	}

	async findAllByClass(classId: string) {
		await this.classesService.ensureExists(classId);

		return this.prisma.client.dailySchedule.findMany({
			where: { classId },
		});
	}

	async findOne(id: string) {
		return this.prisma.client.dailySchedule.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateDailyScheduleDto: UpdateDailyScheduleDto) {
		if (updateDailyScheduleDto.classId) {
			await this.classesService.ensureExists(
				updateDailyScheduleDto.classId
			);
		}

		return this.prisma.client.dailySchedule.update({
			where: { id },
			data: updateDailyScheduleDto,
		});
	}

	async remove(id: string) {
		return this.prisma.client.dailySchedule.softDelete({
			where: { id },
		});
	}

	async ensureExists(id: string) {
		await this.prisma.client.dailySchedule.ensureExists(id);
	}

	async ensureFreeAtTimeRange({
		dailyScheduleId,
		startTime,
		endTime,
		lessonWeek = "all",
	}: {
		dailyScheduleId: string;
		startTime: Date;
		endTime: Date;
		lessonWeek?: $Enums.LessonWeek;
		[key: string]: any;
	}) {
		const lessonsOverlappingStartTime =
			await this.lessonsService.findAllByQuery({
				time: startTime,
				dailyScheduleId,
				lessonWeek,
			});

		if (lessonsOverlappingStartTime.length > 0) {
			throw new BadRequestException(
				"Class is already busy at the specified start time"
			);
		}

		const lessonsOverlappingEndTime =
			await this.lessonsService.findAllByQuery({
				time: endTime,
				dailyScheduleId,
				lessonWeek,
			});

		if (lessonsOverlappingEndTime.length > 0) {
			throw new BadRequestException(
				"Class is already busy at the specified end time"
			);
		}
	}
}
