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

import { CreateDailyScheduleDto } from "./dto/create-daily-schedule.dto";
import { UpdateDailyScheduleDto } from "./dto/update-daily-schedule.dto";

import { DailyScheduleEntity } from "./entities/daily-schedule.entity";

import { DailySchedulesService } from "./daily-schedules.service";

@Controller("daily-schedules")
export class DailySchedulesController {
	constructor(
		private readonly dailySchedulesService: DailySchedulesService
	) {}

	/**
	 * Create a new daily schedule
	 */
	@Post()
	@ApiPost({ type: DailyScheduleEntity })
	async create(@Body() createDailyScheduleDto: CreateDailyScheduleDto) {
		return new DailyScheduleEntity(
			await this.dailySchedulesService.create(createDailyScheduleDto)
		);
	}

	/**
	 * Get all daily schedules for a class
	 */
	@Get("class/:classId")
	@ApiGet({ type: [DailyScheduleEntity] })
	async findAllByClass(
		@Param("classId", ObjectIdValidationPipe) classId: string
	) {
		const dailySchedules =
			await this.dailySchedulesService.findAllByClass(classId);

		return dailySchedules.map(
			dailySchedule => new DailyScheduleEntity(dailySchedule)
		);
	}

	/**
	 * Get a daily schedule by ID
	 */
	@Get(":id")
	@ApiGet({ type: DailyScheduleEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return this.dailySchedulesService.findOne(id);
	}

	/**
	 * Update a daily schedule by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: DailyScheduleEntity })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateDailyScheduleDto: UpdateDailyScheduleDto
	) {
		return this.dailySchedulesService.update(id, updateDailyScheduleDto);
	}

	/**
	 * Delete a daily schedule by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: DailyScheduleEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return this.dailySchedulesService.remove(id);
	}
}
