import { forwardRef, Module } from "@nestjs/common";
import { SubjectsService } from "./subjects.service";
import { SubjectsController } from "./subjects.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { SchoolsModule } from "@resources/schools/schools.module";
import { TeachersModule } from "@resources/teachers/teachers.module";

@Module({
	controllers: [SubjectsController],
	providers: [SubjectsService],
	imports: [PrismaModule, SchoolsModule, forwardRef(() => TeachersModule)],
	exports: [SubjectsService],
})
export class SubjectsModule {}
