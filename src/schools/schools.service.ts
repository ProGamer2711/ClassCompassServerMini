import { Injectable } from "@nestjs/common";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SchoolsService {
	constructor(private readonly prisma: PrismaService) {}

	create(createSchoolDto: CreateSchoolDto) {
		return this.prisma.school.create({ data: createSchoolDto });
	}

	findAll() {
		return this.prisma.school.findMany({
			where: { deletedAt: undefined },
		});
	}

	findOne(id: string) {
		return this.prisma.school.findUniqueOrThrow({
			where: { id, deletedAt: undefined },
		});
	}

	update(id: string, updateSchoolDto: UpdateSchoolDto) {
		return this.prisma.school.update({
			where: { id, deletedAt: undefined },
			data: updateSchoolDto,
		});
	}

	remove(id: string) {
		return this.prisma.school.update({
			where: { id, deletedAt: undefined },
			data: { deletedAt: new Date() },
		});
	}
}
