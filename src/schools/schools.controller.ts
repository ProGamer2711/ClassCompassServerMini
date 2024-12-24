import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { SchoolEntity } from "./entities/school.entity";
import { ObjectIdValidationPipe } from "src/object-id-validation/object-id-validation.pipe";
import { ApiResponses } from "src/api-responses/api-responses.decorator";

@Controller("schools")
export class SchoolsController {
	constructor(private readonly schoolsService: SchoolsService) {}

	/**
	 * Create a new school
	 */
	@Post()
	@ApiResponses({ type: SchoolEntity, responseType: "created" })
	async create(@Body() createSchoolDto: CreateSchoolDto) {
		return new SchoolEntity(
			await this.schoolsService.create(createSchoolDto)
		);
	}

	/**
	 * Get all schools
	 */
	@Get()
	@ApiResponses({ type: [SchoolEntity] })
	async findAll() {
		const schools = await this.schoolsService.findAll();

		return schools.map(school => new SchoolEntity(school));
	}

	/**
	 * Get a school by ID
	 */
	@Get(":id")
	@ApiResponses({ type: SchoolEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SchoolEntity(await this.schoolsService.findOne(id));
	}

	/**
	 * Update a school by ID
	 */
	@Patch(":id")
	@ApiResponses({ type: SchoolEntity })
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
	@ApiResponses({ type: SchoolEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SchoolEntity(await this.schoolsService.remove(id));
	}
}
