import { forwardRef, Inject, Injectable } from "@nestjs/common";

import { SchoolsService } from "@resources/schools/schools.service";
import { UsersService } from "@resources/users/users.service";

import { PrismaService } from "@prisma/prisma.service";

import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RolesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly schoolsService: SchoolsService,
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService
	) {}

	async create(createRoleDto: CreateRoleDto) {
		await this.schoolsService.ensureExists(createRoleDto.schoolId);

		if (createRoleDto.userIds) {
			await this.usersService.ensureExistsMany(createRoleDto.userIds);
		}

		return this.prisma.client.role.create({
			data: createRoleDto,
		});
	}

	async findAllBySchool(schoolId: string) {
		await this.schoolsService.ensureExists(schoolId);

		return this.prisma.client.role.findMany({
			where: { schoolId },
		});
	}

	async findOne(id: string) {
		return this.prisma.client.role.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateRoleDto: UpdateRoleDto) {
		if (updateRoleDto.schoolId) {
			await this.schoolsService.ensureExists(updateRoleDto.schoolId);
		}

		if (updateRoleDto.userIds) {
			await this.usersService.ensureExistsMany(updateRoleDto.userIds);
		}

		return this.prisma.client.role.update({
			where: { id },
			data: updateRoleDto,
		});
	}

	async remove(id: string) {
		return this.prisma.client.role.softDelete({
			where: { id },
		});
	}

	async ensureExists(id: string) {
		return this.prisma.client.role.ensureExists(id);
	}

	async ensureExistsMany(ids: string[]) {
		return this.prisma.client.role.ensureExistsMany(ids);
	}
}
