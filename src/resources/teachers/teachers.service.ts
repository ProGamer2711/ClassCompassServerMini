import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
} from "@nestjs/common";
import { $Enums } from "@prisma/client";

import { LessonsService } from "@resources/lessons/lessons.service";
import { SchoolsService } from "@resources/schools/schools.service";
import { SubjectsService } from "@resources/subjects/subjects.service";

import { PrismaService } from "@prisma/prisma.service";

import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

@Injectable()
export class TeachersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly schoolsService: SchoolsService,
		@Inject(forwardRef(() => SubjectsService))
		private readonly subjectsService: SubjectsService,
		@Inject(forwardRef(() => LessonsService))
		private readonly lessonsService: LessonsService
	) {}

	async create(createTeacherDto: CreateTeacherDto) {
		await this.schoolsService.ensureExists(createTeacherDto.schoolId);

		if (createTeacherDto.subjectIds) {
			await this.subjectsService.ensureExistsMany(
				createTeacherDto.subjectIds
			);
		}

		return this.prisma.client.teacher.create({
			data: createTeacherDto,
		});
	}

	async findAllBySchool(schoolId: string) {
		await this.schoolsService.ensureExists(schoolId);

		return this.prisma.client.teacher.findMany({
			where: { schoolId },
		});
	}

	async findOne(id: string) {
		return this.prisma.client.teacher.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateTeacherDto: UpdateTeacherDto) {
		if (updateTeacherDto.schoolId) {
			await this.schoolsService.ensureExists(updateTeacherDto.schoolId);
		}

		if (updateTeacherDto.subjectIds) {
			await this.subjectsService.ensureExistsMany(
				updateTeacherDto.subjectIds
			);
		}

		return this.prisma.client.teacher.update({
			where: { id },
			data: updateTeacherDto,
		});
	}

	async remove(id: string) {
		return this.prisma.client.teacher.softDelete({
			where: { id },
		});
	}

	async ensureExists(id: string) {
		await this.prisma.client.teacher.ensureExists(id);
	}

	async ensureExistsMany(ids: string[]) {
		await this.prisma.client.teacher.ensureExistsMany(ids);
	}

	async ensureFreeAtTimeRange({
		teacherId,
		startTime,
		endTime,
		lessonWeek = "all",
	}: {
		teacherId: string;
		startTime: Date;
		endTime: Date;
		lessonWeek?: $Enums.LessonWeek;
		[key: string]: any;
	}) {
		const lessonsOverlappingStartTime =
			await this.lessonsService.findAllByQuery({
				time: startTime,
				teacherId,
				lessonWeek,
			});

		if (lessonsOverlappingStartTime.length > 0) {
			throw new BadRequestException(
				"Teacher is already busy at the specified start time"
			);
		}

		const lessonsOverlappingEndTime =
			await this.lessonsService.findAllByQuery({
				time: endTime,
				teacherId,
				lessonWeek,
			});

		if (lessonsOverlappingEndTime.length > 0) {
			throw new BadRequestException(
				"Teacher is already busy at the specified end time"
			);
		}
	}
}
