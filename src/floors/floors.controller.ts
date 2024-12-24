import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { FloorsService } from "./floors.service";
import { CreateFloorDto } from "./dto/create-floor.dto";
import { UpdateFloorDto } from "./dto/update-floor.dto";
import { FloorEntity } from "./entities/floor.entity";
import { ObjectIdValidationPipe } from "src/object-id-validation/object-id-validation.pipe";
import { ApiResponses } from "src/api-responses/api-responses.decorator";

@Controller("floors")
export class FloorsController {
	constructor(private readonly floorsService: FloorsService) {}

	/**
	 * Create a new floor
	 */
	@Post()
	@ApiResponses({ type: FloorEntity, responseType: "created" })
	async create(@Body() createFloorDto: CreateFloorDto) {
		return new FloorEntity(await this.floorsService.create(createFloorDto));
	}

	/**
	 * Get all floors for a building
	 */
	@Get("building/:buildingId")
	@ApiResponses({ type: [FloorEntity] })
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
	@ApiResponses({ type: FloorEntity })
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new FloorEntity(await this.floorsService.findOne(id));
	}

	/**
	 * Update a floor by ID
	 */
	@Patch(":id")
	@ApiResponses({ type: FloorEntity })
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
	@Delete(":id")
	@ApiResponses({ type: FloorEntity })
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new FloorEntity(await this.floorsService.remove(id));
	}
}
