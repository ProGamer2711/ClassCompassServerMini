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

@Controller("subjects")
export class SubjectsController {
	constructor(private readonly subjectsService: SubjectsService) {}

	@Post()
	create(@Body() createSubjectDto: CreateSubjectDto) {
		return this.subjectsService.create(createSubjectDto);
	}

	@Get("school/:schoolId")
	findAllBySchool(
		@Param("schoolId", ObjectIdValidationPipe) schoolId: string
	) {
		return this.subjectsService.findAllBySchool(schoolId);
	}

	@Get(":id")
	findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return this.subjectsService.findOne(id);
	}

	@Patch(":id")
	update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateSubjectDto: UpdateSubjectDto
	) {
		return this.subjectsService.update(id, updateSubjectDto);
	}

	@Delete(":id")
	remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return this.subjectsService.remove(id);
	}
}
