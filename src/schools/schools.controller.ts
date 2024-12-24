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
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ObjectIdValidationPipe } from "src/object-id-validation/object-id-validation.pipe";

@Controller("schools")
export class SchoolsController {
	constructor(private readonly schoolsService: SchoolsService) {}

	@Post()
	@ApiCreatedResponse({ type: SchoolEntity })
	async create(@Body() createSchoolDto: CreateSchoolDto) {
		return new SchoolEntity(
			await this.schoolsService.create(createSchoolDto)
		);
	}

	@Get()
	@ApiOkResponse({ type: [SchoolEntity] })
	async findAll() {
		const schools = await this.schoolsService.findAll();

		return schools.map(school => new SchoolEntity(school));
	}

	@Get(":id")
	@ApiOkResponse({ type: SchoolEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SchoolEntity(await this.schoolsService.findOne(id));
	}

	@Patch(":id")
	@ApiOkResponse({ type: SchoolEntity })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateSchoolDto: UpdateSchoolDto
	) {
		return new SchoolEntity(
			await this.schoolsService.update(id, updateSchoolDto)
		);
	}

	@Delete(":id")
	@ApiOkResponse({ type: SchoolEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SchoolEntity(await this.schoolsService.remove(id));
	}
}
