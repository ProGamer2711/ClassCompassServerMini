import { Module } from "@nestjs/common";

import { SchoolsModule } from "@resources/schools/schools.module";

import { PrismaModule } from "@prisma/prisma.module";

import { ClassesController } from "./classes.controller";
import { ClassesService } from "./classes.service";

@Module({
	controllers: [ClassesController],
	providers: [ClassesService],
	imports: [PrismaModule, SchoolsModule],
	exports: [ClassesService],
})
export class ClassesModule {}
