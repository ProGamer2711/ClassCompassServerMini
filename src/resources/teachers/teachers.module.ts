import { forwardRef, Module } from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { TeachersController } from "./teachers.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { SchoolsModule } from "@resources/schools/schools.module";
import { SubjectsModule } from "@resources/subjects/subjects.module";

@Module({
	controllers: [TeachersController],
	providers: [TeachersService],
	imports: [PrismaModule, SchoolsModule, forwardRef(() => SubjectsModule)],
	exports: [TeachersService],
})
export class TeachersModule {}
