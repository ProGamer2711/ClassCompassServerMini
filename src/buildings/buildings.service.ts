import { Injectable } from "@nestjs/common";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BuildingsService {
	constructor(private readonly prisma: PrismaService) {}

	create(createBuildingDto: CreateBuildingDto) {
		return this.prisma.client.building.create({
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
		return this.prisma.client.building.findMany({
			where: { schoolId },
		});
	}

	findOne(id: string) {
		return this.prisma.client.building.findUniqueOrThrow({
			where: { id },
		});
	}

	update(id: string, updateBuildingDto: UpdateBuildingDto) {
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
