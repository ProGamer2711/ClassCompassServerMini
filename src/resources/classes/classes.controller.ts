import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";

import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";

import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@decorators/index";

import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";

import { ClassEntity } from "./entities/class.entity";

import { ClassesService } from "./classes.service";

@Controller("classes")
export class ClassesController {
	constructor(private readonly classesService: ClassesService) {}

	/**
	 * Create a new class
	 */
	@Post()
	@ApiPost({ type: ClassEntity })
	async create(@Body() createClassDto: CreateClassDto) {
		return new ClassEntity(
			await this.classesService.create(createClassDto)
		);
	}

	/**
	 * Get all classes for a school
	 */
	@Get("school/:schoolId")
	@ApiGet({ type: [ClassEntity] })
	async findAllBySchool(
		@Param("schoolId", ObjectIdValidationPipe) schoolId: string
	) {
		const classes = await this.classesService.findAllBySchool(schoolId);

		return classes.map(classEntity => new ClassEntity(classEntity));
	}

	/**
	 * Get a class by ID
	 */
	@Get(":id")
	@ApiGet({ type: ClassEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new ClassEntity(await this.classesService.findOne(id));
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
			await this.classesService.update(id, updateClassDto)
		);
	}

	/**
	 * Delete a class by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: ClassEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new ClassEntity(await this.classesService.remove(id));
	}
}
