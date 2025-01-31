import {
	Controller,
	Body,
	Param,
	Get,
	Post,
	Patch,
	Delete,
} from "@nestjs/common";
import { FloorsService } from "./floors.service";
import { CreateFloorDto } from "./dto/create-floor.dto";
import { UpdateFloorDto } from "./dto/update-floor.dto";
import { FloorEntity } from "./entities/floor.entity";
import { ObjectIdValidationPipe } from "@shared/pipes/object-id-validation/object-id-validation.pipe";
import { ApiPost, ApiGet, ApiPatch, ApiDelete } from "@decorators/index";

@Controller("floors")
export class FloorsController {
	constructor(private readonly floorsService: FloorsService) {}

	/**
	 * Create a new floor
	 */
	@Post()
	@ApiPost({ type: FloorEntity })
	async create(@Body() createFloorDto: CreateFloorDto) {
		return new FloorEntity(await this.floorsService.create(createFloorDto));
	}

	/**
	 * Get all floors for a building
	 */
	@Get("building/:buildingId")
	@ApiGet({ type: [FloorEntity] })
	async findAllByBuilding(
		@Param("buildingId", ObjectIdValidationPipe) buildingId: string
	) {
		const floors = await this.floorsService.findAllByBuilding(buildingId);

		return floors.map(floor => new FloorEntity(floor));
	}

	/**
	 * Get a floor by ID
	 */
	@Get(":id")
	@ApiGet({ type: FloorEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new FloorEntity(await this.floorsService.findOne(id));
	}

	/**
	 * Update a floor by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: FloorEntity })
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateFloorDto: UpdateFloorDto
	) {
		return new FloorEntity(
			await this.floorsService.update(id, updateFloorDto)
		);
	}

	/**
	 * Delete a floor by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: FloorEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new FloorEntity(await this.floorsService.remove(id));
	}
}
