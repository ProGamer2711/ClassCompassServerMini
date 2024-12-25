import { Module } from "@nestjs/common";
import { FloorsService } from "./floors.service";
import { FloorsController } from "./floors.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { BuildingsModule } from "@resources/buildings/buildings.module";

@Module({
	controllers: [FloorsController],
	providers: [FloorsService],
	imports: [PrismaModule, BuildingsModule],
	exports: [FloorsService],
})
export class FloorsModule {}
