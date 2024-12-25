import {
	Controller,
	Body,
	Param,
	Get,
	Post,
	Patch,
	Delete,
} from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";
import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@shared/decorators";
import { TeacherEntity } from "./entities/teacher.entity";

@Controller("teachers")
export class TeachersController {
	constructor(private readonly teachersService: TeachersService) {}

	/**
	 * Create a new teacher
	 */
	@Post()
	@ApiPost({ type: TeacherEntity, errorResponses: { CONFLICT: false } })
	async create(@Body() createTeacherDto: CreateTeacherDto) {
		return new TeacherEntity(
			await this.teachersService.create(createTeacherDto)
		);
	}

	/**
	 * Get all teachers for a school
	 */
	@Get("school/:schoolId")
	@ApiGet({ type: [TeacherEntity] })
	async findAllBySchool(
		@Param("schoolId", ObjectIdValidationPipe) schoolId: string
	) {
		const teachers = await this.teachersService.findAllBySchool(schoolId);

		return teachers.map(teacher => new TeacherEntity(teacher));
	}

	/**
	 * Get a teacher by ID
	 */
	@Get(":id")
	@ApiGet({ type: TeacherEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new TeacherEntity(await this.teachersService.findOne(id));
	}

	/**
	 * Update a teacher by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: TeacherEntity, errorResponses: { CONFLICT: false } })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateTeacherDto: UpdateTeacherDto
	) {
		return new TeacherEntity(
			await this.teachersService.update(id, updateTeacherDto)
		);
	}

	/**
	 * Delete a teacher by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: TeacherEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new TeacherEntity(await this.teachersService.remove(id));
	}
}
