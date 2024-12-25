import { Controller, Body, Param } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { SchoolEntity } from "./entities/school.entity";
import { ObjectIdValidationPipe } from "src/object-id-validation/object-id-validation.pipe";
import { ApiPost } from "src/api-post/api-post.decorator";
import { ApiGet } from "src/api-get/api-get.decorator";
import { ApiPatch } from "src/api-patch/api-patch.decorator";
import { ApiDelete } from "src/api-delete/api-delete.decorator";

@Controller("schools")
export class SchoolsController {
	constructor(private readonly schoolsService: SchoolsService) {}

	/**
	 * Create a new school
	 */
	@ApiPost({ type: SchoolEntity, errorResponses: { NOT_FOUND: false } })
	async create(@Body() createSchoolDto: CreateSchoolDto) {
		return new SchoolEntity(
			await this.schoolsService.create(createSchoolDto)
		);
	}

	/**
	 * Get all schools
	 */
	@ApiGet({
		type: [SchoolEntity],
		errorResponses: { BAD_REQUEST: false, NOT_FOUND: false },
	})
	async findAll() {
		const schools = await this.schoolsService.findAll();

		return schools.map(school => new SchoolEntity(school));
	}

	/**
	 * Get a school by ID
	 */
	@ApiGet({ type: SchoolEntity, path: ":id" })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SchoolEntity(await this.schoolsService.findOne(id));
	}

	/**
	 * Update a school by ID
	 */
	@ApiPatch({ type: SchoolEntity, path: ":id" })
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
	@ApiDelete({ type: SchoolEntity, path: ":id" })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SchoolEntity(await this.schoolsService.remove(id));
	}
}
