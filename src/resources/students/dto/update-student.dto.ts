import { ApiSchema, PartialType } from "@nestjs/swagger";

import { CreateStudentDto } from "./create-student.dto";

@ApiSchema({
	description: "The data required to update a student",
})
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
