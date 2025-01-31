import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentEntity } from "./entities/student.entity";
import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";
import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@shared/decorators";

@Controller("students")
export class StudentsController {
	constructor(private readonly studentService: StudentsService) {}

	/**
	 * Create a new student
	 */
	@Post()
	@ApiPost({ type: StudentEntity, errorResponses: { CONFLICT: false } })
	async create(@Body() createStudentDto: CreateStudentDto) {
		return new StudentEntity(
			await this.studentService.create(createStudentDto)
		);
	}

	/**
	 * Get all students for a class
	 */
	@Get("class/:classId")
	@ApiGet({ type: [StudentEntity] })
	async findAll(@Param("classId", ObjectIdValidationPipe) classId: string) {
		const students = await this.studentService.findAllByClass(classId);

		return students.map(student => new StudentEntity(student));
	}

	/**
	 * Get a student by ID
	 */
	@Get(":id")
	@ApiGet({ type: StudentEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new StudentEntity(await this.studentService.findOne(id));
	}

	/**
	 * Update a student by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: StudentEntity, errorResponses: { CONFLICT: false } })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateStudentDto: UpdateStudentDto
	) {
		return new StudentEntity(
			await this.studentService.update(id, updateStudentDto)
		);
	}

	/**
	 * Delete a student by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: StudentEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new StudentEntity(await this.studentService.remove(id));
	}
}
