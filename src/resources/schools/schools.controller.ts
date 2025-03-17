import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { Attributes } from "@resources/auth/decorators/attributes.decorator";

import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";

import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";

import { SchoolEntity } from "./entities/school.entity";

import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@decorators";

import { SchoolsService } from "./schools.service";

@Controller("schools")
export class SchoolsController {
	constructor(private readonly schoolsService: SchoolsService) {}

	/**
	 * Create a new school
	 */
	@Post()
	@ApiPost({ type: SchoolEntity, errorResponses: { NOT_FOUND: false } })
	@Attributes({
		OR: ["school:create", "school:*"],
	})
	@ApiBearerAuth("Access Token")
	async create(@Body() createSchoolDto: CreateSchoolDto) {
		return new SchoolEntity(
			await this.schoolsService.create(createSchoolDto)
		);
	}

	/**
	 * Get all schools
	 */
	@Get()
	@ApiGet({
		type: [SchoolEntity],
		errorResponses: { BAD_REQUEST: false, NOT_FOUND: false },
	})
	@Attributes({
		OR: ["school:read", "school:*"],
	})
	@ApiBearerAuth("Access Token")
	async findAll() {
		const schools = await this.schoolsService.findAll();

		return schools.map(school => new SchoolEntity(school));
	}

	/**
	 * Get a school by ID
	 */
	@Get(":id")
	@ApiGet({ type: SchoolEntity })
	@Attributes({
		OR: ["school:read", "school:*"],
	})
	@ApiBearerAuth("Access Token")
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SchoolEntity(await this.schoolsService.findOne(id));
	}

	/**
	 * Update a school by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: SchoolEntity })
	@Attributes({
		OR: ["school:update", "school:*"],
	})
	@ApiBearerAuth("Access Token")
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateSchoolDto: UpdateSchoolDto
	) {
		return new SchoolEntity(
			await this.schoolsService.update(id, updateSchoolDto)
		);
	}

	/**
	 * Delete a school by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: SchoolEntity })
	@Attributes({
		OR: ["school:delete", "school:*"],
	})
	@ApiBearerAuth("Access Token")
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SchoolEntity(await this.schoolsService.remove(id));
	}
}
