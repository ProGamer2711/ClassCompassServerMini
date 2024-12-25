import { Controller, Body, Param } from "@nestjs/common";
import { FloorsService } from "./floors.service";
import { CreateFloorDto } from "./dto/create-floor.dto";
import { UpdateFloorDto } from "./dto/update-floor.dto";
import { FloorEntity } from "./entities/floor.entity";
import { ObjectIdValidationPipe } from "src/object-id-validation/object-id-validation.pipe";
import { ApiPost } from "src/api-post/api-post.decorator";
import { ApiGet } from "src/api-get/api-get.decorator";
import { ApiPatch } from "src/api-patch/api-patch.decorator";
import { ApiDelete } from "src/api-delete/api-delete.decorator";

@Controller("floors")
export class FloorsController {
	constructor(private readonly floorsService: FloorsService) {}

	/**
	 * Create a new floor
	 */
	@ApiPost({ type: FloorEntity })
	async create(@Body() createFloorDto: CreateFloorDto) {
		return new FloorEntity(await this.floorsService.create(createFloorDto));
	}

	/**
	 * Get all floors for a building
	 */
	@ApiGet({ type: [FloorEntity], path: "building/:buildingId" })
	async findAllByBuilding(
		@Param("buildingId", ObjectIdValidationPipe) buildingId: string
	) {
		const floors = await this.floorsService.findAllByBuilding(buildingId);

		return floors.map(floor => new FloorEntity(floor));
	}

	/**
	 * Get a floor by ID
	 */
	@ApiGet({ type: FloorEntity, path: ":id" })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new FloorEntity(await this.floorsService.findOne(id));
	}

	/**
	 * Update a floor by ID
	 */
	@ApiPatch({ type: FloorEntity, path: ":id" })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateFloorDto: UpdateFloorDto
	) {
		return new FloorEntity(
			await this.floorsService.update(id, updateFloorDto)
		);
	}

	/**
	 * Remove a floor by ID
	 */
	@ApiDelete({ type: FloorEntity, path: ":id" })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new FloorEntity(await this.floorsService.remove(id));
	}
}
