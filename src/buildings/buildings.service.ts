import { Injectable } from "@nestjs/common";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { SchoolsService } from "src/schools/schools.service";

@Injectable()
export class BuildingsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly schoolsService: SchoolsService
	) {}

	async create(createBuildingDto: CreateBuildingDto) {
		// check the school exists
		// if it doesn't, Prisma will throw an error
		await this.schoolsService.findOne(createBuildingDto.schoolId);

		return this.prisma.client.building.create({
			data: createBuildingDto,
		});
	}

	async findAllBySchool(schoolId: string) {
		// check the school exists
		// if it doesn't, Prisma will throw an error
		await this.schoolsService.findOne(schoolId);

		return this.prisma.client.building.findMany({
			where: { schoolId },
		});
	}

	findOne(id: string) {
		return this.prisma.client.building.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateBuildingDto: UpdateBuildingDto) {
		if (updateBuildingDto.schoolId) {
			// check the school exists
			// if it doesn't, Prisma will throw an error
			await this.schoolsService.findOne(updateBuildingDto.schoolId);
		}

		return this.prisma.client.building.update({
			where: { id },
			data: updateBuildingDto,
		});
	}

	remove(id: string) {
		return this.prisma.client.building.softDelete({
			where: { id },
		});
	}
}
