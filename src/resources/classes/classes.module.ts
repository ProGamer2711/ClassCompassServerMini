import { Module } from "@nestjs/common";
import { ClassesService } from "./classes.service";
import { ClassesController } from "./classes.controller";
import { SchoolsModule } from "@resources/schools/schools.module";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
	controllers: [ClassesController],
	providers: [ClassesService],
	imports: [PrismaModule, SchoolsModule],
	exports: [ClassesService],
})
export class ClassesModule {}
