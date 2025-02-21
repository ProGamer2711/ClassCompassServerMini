import { Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";

import { SchoolsService } from "@resources/schools/schools.service";

import { PrismaService } from "@prisma/prisma.service";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly schoolsService: SchoolsService
	) {}

	async create(createUserDto: CreateUserDto) {
		await this.schoolsService.ensureExists(createUserDto.schoolId);

		// hash the user's password with 11 rounds of salt
		createUserDto.password = await hash(createUserDto.password, 11);

		return this.prisma.client.user.create({
			data: createUserDto,
		});
	}

	async findAllBySchool(schoolId: string) {
		await this.schoolsService.ensureExists(schoolId);

		return this.prisma.client.user.findMany({
			where: { schoolId },
		});
	}

	async findOne(id: string) {
		return this.prisma.client.user.findUniqueOrThrow({
			where: { id },
		});
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		if (updateUserDto.schoolId) {
			await this.schoolsService.ensureExists(updateUserDto.schoolId);
		}

		return this.prisma.client.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	async remove(id: string) {
		return this.prisma.client.user.softDelete({
			where: { id },
		});
	}
}
