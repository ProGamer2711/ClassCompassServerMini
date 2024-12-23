import { Injectable } from "@nestjs/common";
import { CreateFloorDto } from "./dto/create-floor.dto";
import { UpdateFloorDto } from "./dto/update-floor.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FloorsService {
	constructor(private readonly prisma: PrismaService) {}

	create(createFloorDto: CreateFloorDto) {
		return this.prisma.floor.create({
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
		return this.prisma.floor.findMany({
			where: { buildingId, deleted: false },
		});
	}

	findOne(id: string) {
		return this.prisma.floor.findUniqueOrThrow({
			where: { id, deleted: false },
		});
	}

	update(id: string, updateFloorDto: UpdateFloorDto) {
		return this.prisma.floor.update({
			where: { id, deleted: false },
			data: updateFloorDto,
		});
	}

	remove(id: string) {
		return this.prisma.floor.update({
			where: { id, deleted: false },
			data: { deleted: true, deletedAt: new Date() },
		});
	}

	// TODO: add floor plans and masks
}
