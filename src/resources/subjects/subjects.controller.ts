import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { SubjectsService } from "./subjects.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";
import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@shared/decorators";
import { SubjectEntity } from "./entities/subject.entity";

@Controller("subjects")
export class SubjectsController {
	constructor(private readonly subjectsService: SubjectsService) {}

	/**
	 * Create a new subject
	 */
	@Post()
	@ApiPost({ type: SubjectEntity })
	async create(@Body() createSubjectDto: CreateSubjectDto) {
		return new SubjectEntity(
			await this.subjectsService.create(createSubjectDto)
		);
	}

	/**
	 * Get all subjects for a school
	 */
	@Get("school/:schoolId")
	@ApiGet({ type: [SubjectEntity] })
	async findAllBySchool(
		@Param("schoolId", ObjectIdValidationPipe) schoolId: string
	) {
		const subjects = await this.subjectsService.findAllBySchool(schoolId);

		return subjects.map(subject => new SubjectEntity(subject));
	}

	/**
	 * Get a subject by ID
	 */
	@Get(":id")
	@ApiGet({ type: SubjectEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SubjectEntity(await this.subjectsService.findOne(id));
	}

	/**
	 * Update a subject by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: SubjectEntity })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateSubjectDto: UpdateSubjectDto
	) {
		return new SubjectEntity(
			await this.subjectsService.update(id, updateSubjectDto)
		);
	}

	/**
	 * Remove a subject by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: SubjectEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new SubjectEntity(await this.subjectsService.remove(id));
	}
}
