import {
	Controller,
	Body,
	Param,
	Get,
	Post,
	Patch,
	Delete,
} from "@nestjs/common";

import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";

import { ApiPost, ApiGet, ApiPatch, ApiDelete } from "@decorators/index";

import { CreateBuildingDto } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";

import { BuildingEntity } from "./entities/building.entity";

import { BuildingsService } from "./buildings.service";

@Controller("buildings")
export class BuildingsController {
	constructor(private readonly buildingsService: BuildingsService) {}

	/**
	 * Create a new building
	 */
	@Post()
	@ApiPost({ type: BuildingEntity })
	async create(@Body() createBuildingDto: CreateBuildingDto) {
		return new BuildingEntity(
			await this.buildingsService.create(createBuildingDto)
		);
	}

	/**
	 * Get all buildings for a school
	 */
	@Get("school/:schoolId")
	@ApiGet({ type: [BuildingEntity] })
	async findAllBySchool(
		@Param("schoolId", ObjectIdValidationPipe) schoolId: string
	) {
		const buildings = await this.buildingsService.findAllBySchool(schoolId);

		return buildings.map(building => new BuildingEntity(building));
	}

	/**
	 * Get a building by ID
	 */
	@Get(":id")
	@ApiGet({ type: BuildingEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new BuildingEntity(await this.buildingsService.findOne(id));
	}

	/**
	 * Update a building by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: BuildingEntity })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateBuildingDto: UpdateBuildingDto
	) {
		return new BuildingEntity(
			await this.buildingsService.update(id, updateBuildingDto)
		);
	}

	/**
	 * Delete a building by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: BuildingEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new BuildingEntity(await this.buildingsService.remove(id));
	}
}
