import { Injectable } from "@nestjs/common";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BuildingsService {
	constructor(private readonly prisma: PrismaService) {}

	create(createBuildingDto: CreateBuildingDto) {
		return this.prisma.building.create({
			data: {
				...createBuildingDto,
				schoolId: undefined,
				school: {
					connect: { id: createBuildingDto.schoolId },
				},
			},
		});
	}

	findAllBySchool(schoolId: string) {
		return this.prisma.building.findMany({
			where: { schoolId, deleted: false },
		});
	}

	findOne(id: string) {
		return this.prisma.building.findUniqueOrThrow({
			where: { id, deleted: false },
		});
	}

	update(id: string, updateBuildingDto: UpdateBuildingDto) {
		return this.prisma.building.update({
			where: { id, deleted: false },
			data: updateBuildingDto,
		});
	}

	remove(id: string) {
		return this.prisma.building.update({
			where: { id, deleted: false },
			data: { deleted: true, deletedAt: new Date() },
		});
	}
}
