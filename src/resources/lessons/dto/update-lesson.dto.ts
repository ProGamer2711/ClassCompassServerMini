import { ApiSchema, PartialType } from "@nestjs/swagger";

import { CreateLessonDto } from "./create-lesson.dto";

@ApiSchema({
	description: "The data required to update a lesson",
})
export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
