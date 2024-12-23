import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { BuildingsService } from "./buildings.service";
import { CreateBuildingDto } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { BuildingEntity } from "./entities/building.entity";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";

@Controller("buildings")
export class BuildingsController {
	constructor(private readonly buildingsService: BuildingsService) {}

	@Post()
	@ApiCreatedResponse({ type: BuildingEntity })
	async create(@Body() createBuildingDto: CreateBuildingDto) {
		return new BuildingEntity(
			await this.buildingsService.create(createBuildingDto)
		);
	}

	@Get("school/:schoolId")
	@ApiOkResponse({ type: [BuildingEntity] })
	async findAllBySchool(@Param("schoolId") schoolId: string) {
		const buildings = await this.buildingsService.findAllBySchool(schoolId);

		return buildings.map(building => new BuildingEntity(building));
	}

	@Get(":id")
	@ApiOkResponse({ type: BuildingEntity })
	async findOne(@Param("id") id: string) {
		return new BuildingEntity(await this.buildingsService.findOne(id));
	}

	@Patch(":id")
	@ApiOkResponse({ type: BuildingEntity })
	async update(
		@Param("id") id: string,
		@Body() updateBuildingDto: UpdateBuildingDto
	) {
		return new BuildingEntity(
			await this.buildingsService.update(id, updateBuildingDto)
		);
	}

	@Delete(":id")
	@ApiOkResponse({ type: BuildingEntity })
	async remove(@Param("id") id: string) {
		return new BuildingEntity(await this.buildingsService.remove(id));
	}
}
