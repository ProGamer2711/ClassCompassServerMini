import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";

import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";

import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@decorators/index";

import { CreateLessonDto } from "./dto/create-lesson.dto";
import { LessonsQueryDto } from "./dto/lessons-query.dto";
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
	async create(@Body() createLessonDto: CreateLessonDto) {
		return new LessonEntity(
			await this.lessonsService.create(createLessonDto)
		);
	}

	/**
	 * Get all lessons for a daily schedule
	 */
	@Get("daily-schedule/:dailyScheduleId")
	@ApiGet({ type: [LessonEntity] })
	async findAllByDailySchedule(
		@Param("dailyScheduleId", ObjectIdValidationPipe)
		dailyScheduleId: string
	) {
		const lessons =
			await this.lessonsService.findAllByDailySchedule(dailyScheduleId);

		return lessons.map(lesson => new LessonEntity(lesson));
	}

	/**
	 * Get a lesson by time and room/teacher/class ID as query parameters
	 */
	@Get()
	@ApiGet({ type: LessonEntity })
	async findAllByQuery(@Query() query: LessonsQueryDto) {
		// ! Might be better to replace classId with dailyScheduleId
		const lessons = await this.lessonsService.findAllByQuery(query);

		return lessons.map(lesson => new LessonEntity(lesson));
	}

	/**
	 * Get a lesson by ID
	 */
	@Get(":id")
	@ApiGet({ type: LessonEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new LessonEntity(await this.lessonsService.findOne(id));
	}

	/**
	 * Update a lesson by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: LessonEntity })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateLessonDto: UpdateLessonDto
	) {
		return new LessonEntity(
			await this.lessonsService.update(id, updateLessonDto)
		);
	}

	/**
	 * Remove a lesson by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: LessonEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new LessonEntity(await this.lessonsService.remove(id));
	}
}
