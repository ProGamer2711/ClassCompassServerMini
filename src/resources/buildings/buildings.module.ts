import { Module } from "@nestjs/common";
import { BuildingsService } from "./buildings.service";
import { BuildingsController } from "./buildings.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { SchoolsModule } from "@resources/schools/schools.module";

@Module({
	controllers: [BuildingsController],
	providers: [BuildingsService],
	imports: [PrismaModule, SchoolsModule],
	exports: [BuildingsService],
})
export class BuildingsModule {}
