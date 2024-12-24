import { Module } from "@nestjs/common";
import { FloorsService } from "./floors.service";
import { FloorsController } from "./floors.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { BuildingsModule } from "src/buildings/buildings.module";

@Module({
	controllers: [FloorsController],
	providers: [FloorsService],
	imports: [PrismaModule, BuildingsModule],
})
export class FloorsModule {}
