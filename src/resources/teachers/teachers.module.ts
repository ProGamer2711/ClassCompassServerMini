import { Module } from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { TeachersController } from "./teachers.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { SchoolsModule } from "@resources/schools/schools.module";

@Module({
	controllers: [TeachersController],
	providers: [TeachersService],
	imports: [PrismaModule, SchoolsModule],
})
export class TeachersModule {}
