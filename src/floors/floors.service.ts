import { Injectable } from "@nestjs/common";
import { CreateFloorDto } from "./dto/create-floor.dto";
import { UpdateFloorDto } from "./dto/update-floor.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FloorsService {
	constructor(private readonly prisma: PrismaService) {}

	create(createFloorDto: CreateFloorDto) {
		return this.prisma.client.floor.create({
			data: {
				...createFloorDto,
				buildingId: undefined,
				building: {
					connect: { id: createFloorDto.buildingId },
				},
			},
		});
	}

	findAllByBuilding(buildingId: string) {
		return this.prisma.client.floor.findMany({
			where: { buildingId },
		});
	}

	findOne(id: string) {
		return this.prisma.client.floor.findUniqueOrThrow({
			where: { id },
		});
	}

	update(id: string, updateFloorDto: UpdateFloorDto) {
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
