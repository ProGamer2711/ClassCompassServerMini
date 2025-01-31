import { forwardRef, Inject, Injectable } from "@nestjs/common";

import { SchoolsService } from "@resources/schools/schools.service";
import { TeachersService } from "@resources/teachers/teachers.service";

import { PrismaService } from "@prisma/prisma.service";

import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";

@Injectable()
export class SubjectsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly schoolsService: SchoolsService,
		@Inject(forwardRef(() => TeachersService))
		private readonly teachersService: TeachersService
	) {}

	async create(createSubjectDto: CreateSubjectDto) {
		await this.schoolsService.ensureExists(createSubjectDto.schoolId);

		if (createSubjectDto.teacherIds) {
			await this.teachersService.ensureExistsMany(
				createSubjectDto.teacherIds
			);
		}

		return this.prisma.client.subject.create({
			data: createSubjectDto,
		});
	}

	async findAllBySchool(schoolId: string) {
		await this.schoolsService.ensureExists(schoolId);

		return this.prisma.client.subject.findMany({
			where: { schoolId },
		});
	}

	findOne(id: string) {
		return this.prisma.client.subject.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateSubjectDto: UpdateSubjectDto) {
		if (updateSubjectDto.schoolId) {
			await this.schoolsService.ensureExists(updateSubjectDto.schoolId);
		}

		if (updateSubjectDto.teacherIds) {
			await this.teachersService.ensureExistsMany(
				updateSubjectDto.teacherIds
			);
		}

		return this.prisma.client.subject.update({
			where: { id },
			data: updateSubjectDto,
		});
	}

	remove(id: string) {
		return this.prisma.client.subject.softDelete({
			where: { id },
		});
	}

	async ensureExists(id: string) {
		await this.prisma.client.subject.ensureExists(id);
	}

	async ensureExistsMany(ids: string[]) {
		await this.prisma.client.subject.ensureExistsMany(ids);
	}
}
