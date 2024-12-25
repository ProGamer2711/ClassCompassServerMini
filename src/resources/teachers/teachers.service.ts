import { Injectable } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { PrismaService } from "@prisma/prisma.service";
import { SchoolsService } from "@resources/schools/schools.service";

@Injectable()
export class TeachersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly schoolsService: SchoolsService
		// TODO: add subjects service
	) {}

	async create(createTeacherDto: CreateTeacherDto) {
		// check the school exists
		// if it doesn't, Prisma will throw an error
		await this.schoolsService.findOne(createTeacherDto.schoolId);

		return this.prisma.client.teacher.create({
			data: createTeacherDto,
		});
	}

	async findAllBySchool(schoolId: string) {
		// check the school exists
		// if it doesn't, Prisma will throw an error
		await this.schoolsService.findOne(schoolId);

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
			// check the school exists
			// if it doesn't, Prisma will throw an error
			await this.schoolsService.findOne(updateTeacherDto.schoolId);
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
}
