import { Injectable } from "@nestjs/common";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class SchoolsService {
	constructor(private readonly prisma: PrismaService) {}

	create(createSchoolDto: CreateSchoolDto) {
		return this.prisma.client.school.create({
			data: createSchoolDto,
		});
	}

	findAll() {
		return this.prisma.client.school.findMany();
	}

	findOne(id: string) {
		return this.prisma.client.school.findUniqueOrThrow({
			where: { id },
		});
	}

	update(id: string, updateSchoolDto: UpdateSchoolDto) {
		return this.prisma.client.school.update({
			where: { id },
			data: updateSchoolDto,
		});
	}

	remove(id: string) {
		return this.prisma.client.school.softDelete({
			where: { id },
		});
	}
}
