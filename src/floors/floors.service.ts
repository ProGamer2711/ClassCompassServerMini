import { Injectable } from "@nestjs/common";
import { CreateFloorDto } from "./dto/create-floor.dto";
import { UpdateFloorDto } from "./dto/update-floor.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { BuildingsService } from "src/buildings/buildings.service";

@Injectable()
export class FloorsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly buildingsService: BuildingsService
	) {}

	async create(createFloorDto: CreateFloorDto) {
		// check the building exists
		// if it doesn't, Prisma will throw an error
		await this.buildingsService.findOne(createFloorDto.buildingId);

		return this.prisma.client.floor.create({
			data: createFloorDto,
		});
	}

	async findAllByBuilding(buildingId: string) {
		// check the building exists
		// if it doesn't, Prisma will throw an error
		await this.buildingsService.findOne(buildingId);

		return this.prisma.client.floor.findMany({
			where: { buildingId },
		});
	}

	findOne(id: string) {
		return this.prisma.client.floor.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateFloorDto: UpdateFloorDto) {
		if (updateFloorDto.buildingId) {
			// check the building exists
			// if it doesn't, Prisma will throw an error
			await this.buildingsService.findOne(updateFloorDto.buildingId);
		}

		return this.prisma.client.floor.update({
			where: { id },
			data: updateFloorDto,
		});
	}

	remove(id: string) {
		return this.prisma.client.floor.softDelete({
			where: { id },
		});
	}

	// TODO: add floor plans and masks
}
