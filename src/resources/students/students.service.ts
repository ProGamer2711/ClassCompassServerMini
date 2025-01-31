import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { PrismaService } from "@prisma/prisma.service";
import { ClassesService } from "@resources/classes/classes.service";

@Injectable()
export class StudentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly classService: ClassesService
	) {}

	async create(createStudentDto: CreateStudentDto) {
		await this.classService.ensureExists(createStudentDto.classId);

		return this.prisma.client.student.create({
			data: createStudentDto,
		});
	}

	async findAllByClass(classId: string) {
		await this.classService.ensureExists(classId);

		return this.prisma.client.student.findMany({
			where: { classId },
		});
	}

	findOne(id: string) {
		return this.prisma.client.student.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateStudentDto: UpdateStudentDto) {
		if (updateStudentDto.classId) {
			await this.classService.ensureExists(updateStudentDto.classId);
		}

		return this.prisma.client.student.update({
			where: { id },
			data: updateStudentDto,
		});
	}

	remove(id: string) {
		return this.prisma.client.student.softDelete({
			where: { id },
		});
	}
}
