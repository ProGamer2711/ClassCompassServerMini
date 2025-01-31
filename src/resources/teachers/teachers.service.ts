import { forwardRef, Inject, Injectable } from "@nestjs/common";

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
		private readonly subjectsService: SubjectsService
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

	findOne(id: string) {
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

	remove(id: string) {
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
}
