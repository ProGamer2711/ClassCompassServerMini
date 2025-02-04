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

import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";

import { LessonEntity } from "./entities/lesson.entity";

import { LessonsService } from "./lessons.service";

@Controller("lessons")
export class LessonsController {
	constructor(private readonly lessonsService: LessonsService) {}

	/**
	 * Create a new lesson
	 */
	@Post()
	@ApiPost({ type: LessonEntity })
	create(@Body() createLessonDto: CreateLessonDto) {
		return this.lessonsService.create(createLessonDto);
	}

	/**
	 * Get all lessons for a daily schedule
	 */
	@Get("daily-schedule/:dailyScheduleId")
	@ApiGet({ type: [LessonEntity] })
	findAllByDailySchedule(
		@Param("dailyScheduleId", ObjectIdValidationPipe)
		dailyScheduleId: string
	) {
		return this.lessonsService.findAllByDailySchedule(dailyScheduleId);
	}

	/**
	 * Get a lesson by ID
	 */
	@Get(":id")
	@ApiGet({ type: LessonEntity })
	findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return this.lessonsService.findOne(id);
	}

	/**
	 * Update a lesson by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: LessonEntity })
	update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateLessonDto: UpdateLessonDto
	) {
		return this.lessonsService.update(id, updateLessonDto);
	}

	/**
	 * Remove a lesson by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: LessonEntity })
	remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return this.lessonsService.remove(id);
	}
}
