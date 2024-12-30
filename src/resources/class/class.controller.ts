import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { ClassService } from "./class.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";
import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@shared/decorators";
import { ClassEntity } from "./entities/class.entity";
import { ApiTags } from "@nestjs/swagger";

@Controller("classes")
@ApiTags("Classes")
export class ClassController {
	constructor(private readonly classService: ClassService) {}

	/**
	 * Create a new class
	 */
	@Post()
	@ApiPost({ type: ClassEntity })
	async create(@Body() createClassDto: CreateClassDto) {
		return new ClassEntity(await this.classService.create(createClassDto));
	}

	/**
	 * Get all classes for a school
	 */
	@Get("school/:schoolId")
	@ApiGet({ type: [ClassEntity] })
	async findAllBySchool(
		@Param("schoolId", ObjectIdValidationPipe) schoolId: string
	) {
		const classes = await this.classService.findAllBySchool(schoolId);

		return classes.map(classEntity => new ClassEntity(classEntity));
	}

	/**
	 * Get a class by ID
	 */
	@Get(":id")
	@ApiGet({ type: ClassEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new ClassEntity(await this.classService.findOne(id));
	}

	/**
	 * Update a class by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: ClassEntity })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateClassDto: UpdateClassDto
	) {
		return new ClassEntity(
			await this.classService.update(id, updateClassDto)
		);
	}

	/**
	 * Delete a class by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: ClassEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new ClassEntity(await this.classService.remove(id));
	}
}
