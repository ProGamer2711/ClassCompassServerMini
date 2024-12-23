import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
} from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { SchoolEntity } from "./entities/school.entity";
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
} from "@nestjs/swagger";

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
	@ApiNotFoundResponse({
		example: new NotFoundException("School not found").getResponse(),
	})
	async findOne(@Param("id") id: string) {
		const school = await this.schoolsService.findOne(id);

		if (!school) {
			throw new NotFoundException("School not found");
		}

		return new SchoolEntity(school);
	}

	@Patch(":id")
	@ApiOkResponse({ type: SchoolEntity })
	async update(
		@Param("id") id: string,
		@Body() updateSchoolDto: UpdateSchoolDto
	) {
		return new SchoolEntity(
			await this.schoolsService.update(id, updateSchoolDto)
		);
	}

	@Delete(":id")
	@ApiOkResponse({ type: SchoolEntity })
	async remove(@Param("id") id: string) {
		return new SchoolEntity(await this.schoolsService.remove(id));
	}
}
