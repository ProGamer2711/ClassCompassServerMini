import { Injectable } from "@nestjs/common";

import { ClassesService } from "@resources/classes/classes.service";

import { PrismaService } from "@prisma/prisma.service";

import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";

@Injectable()
export class StudentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly classesService: ClassesService
	) {}

	async create(createStudentDto: CreateStudentDto) {
		await this.classesService.ensureExists(createStudentDto.classId);

		return this.prisma.client.student.create({
			data: createStudentDto,
		});
	}

	async findAllByClass(classId: string) {
		await this.classesService.ensureExists(classId);

		return this.prisma.client.student.findMany({
			where: { classId },
		});
	}

	async findOne(id: string) {
		return this.prisma.client.student.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateStudentDto: UpdateStudentDto) {
		if (updateStudentDto.classId) {
			await this.classesService.ensureExists(updateStudentDto.classId);
		}

		return this.prisma.client.student.update({
			where: { id },
			data: updateStudentDto,
		});
	}

	async remove(id: string) {
		return this.prisma.client.student.softDelete({
			where: { id },
		});
	}
}
