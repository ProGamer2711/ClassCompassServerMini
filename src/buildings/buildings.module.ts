import { Module } from "@nestjs/common";
import { BuildingsService } from "./buildings.service";
import { BuildingsController } from "./buildings.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { SchoolsModule } from "src/schools/schools.module";

@Module({
	controllers: [BuildingsController],
	providers: [BuildingsService],
	imports: [PrismaModule, SchoolsModule],
	exports: [BuildingsService],
})
export class BuildingsModule {}
