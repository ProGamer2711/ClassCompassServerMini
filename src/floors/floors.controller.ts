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
import { ApiCreatedResponse } from "@nestjs/swagger";
import { FloorEntity } from "./entities/floor.entity";
import { ObjectIdValidationPipe } from "src/object-id-validation/object-id-validation.pipe";

@Controller("floors")
export class FloorsController {
	constructor(private readonly floorsService: FloorsService) {}

	@Post()
	@ApiCreatedResponse({ type: FloorEntity })
	async create(@Body() createFloorDto: CreateFloorDto) {
		return new FloorEntity(await this.floorsService.create(createFloorDto));
	}

	@Get("building/:buildingId")
	async findAllByBuilding(
		@Param("buildingId", ObjectIdValidationPipe) buildingId: string
	) {
		const floors = await this.floorsService.findAllByBuilding(buildingId);

		return floors.map(floor => new FloorEntity(floor));
	}

	@Get(":id")
	async findOne(@Param("id", ObjectIdValidationPipe) id: string) {
		return new FloorEntity(await this.floorsService.findOne(id));
	}

	@Patch(":id")
	async update(
		@Param("id", ObjectIdValidationPipe) id: string,
		@Body() updateFloorDto: UpdateFloorDto
	) {
		return new FloorEntity(
			await this.floorsService.update(id, updateFloorDto)
		);
	}

	@Delete(":id")
	async remove(@Param("id", ObjectIdValidationPipe) id: string) {
		return new FloorEntity(await this.floorsService.remove(id));
	}
}
