import { Controller, Body, Param } from "@nestjs/common";
import { BuildingsService } from "./buildings.service";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { BuildingEntity } from "./entities/building.entity";
import { ObjectIdValidationPipe } from "src/object-id-validation/object-id-validation.pipe";
import { ApiPost } from "src/api-post/api-post.decorator";
import { ApiGet } from "src/api-get/api-get.decorator";
import { ApiPatch } from "src/api-patch/api-patch.decorator";
import { ApiDelete } from "src/api-delete/api-delete.decorator";

@Controller("buildings")
export class BuildingsController {
	constructor(private readonly buildingsService: BuildingsService) {}

	/**
	 * Create a new building
	 */
	@ApiPost({ type: BuildingEntity })
	async create(@Body() createBuildingDto: CreateBuildingDto) {
		return new BuildingEntity(
			await this.buildingsService.create(createBuildingDto)
		);
	}

	/**
	 * Get all buildings for a school
	 */
	@ApiGet({
		type: [BuildingEntity],
		path: "school/:schoolId",
	})
	async findAllBySchool(
		@Param("schoolId", ObjectIdValidationPipe) schoolId: string
	) {
		const buildings = await this.buildingsService.findAllBySchool(schoolId);

		return buildings.map(building => new BuildingEntity(building));
	}

	/**
	 * Get a building by ID
	 */
	@ApiGet({
		type: BuildingEntity,
		path: ":id",
	})
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new BuildingEntity(await this.buildingsService.findOne(id));
	}

	/**
	 * Update a building by ID
	 */
	@ApiPatch({ type: BuildingEntity, path: ":id" })
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
	@ApiDelete({ type: BuildingEntity, path: ":id" })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new BuildingEntity(await this.buildingsService.remove(id));
	}
}
