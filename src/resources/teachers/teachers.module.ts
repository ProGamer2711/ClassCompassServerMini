import { forwardRef, Module } from "@nestjs/common";

import { SchoolsModule } from "@resources/schools/schools.module";
import { SubjectsModule } from "@resources/subjects/subjects.module";

import { PrismaModule } from "@prisma/prisma.module";

import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";

@Module({
	controllers: [TeachersController],
	providers: [TeachersService],
	imports: [PrismaModule, SchoolsModule, forwardRef(() => SubjectsModule)],
	exports: [TeachersService],
})
export class TeachersModule {}
