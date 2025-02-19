import { Module } from "@nestjs/common";

import { SchoolsModule } from "@resources/schools/schools.module";

import { PrismaModule } from "@prisma/prisma.module";

import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";

@Module({
	controllers: [TeachersController],
	providers: [TeachersService],
	imports: [PrismaModule, SchoolsModule],
	exports: [TeachersService],
})
export class TeachersModule {}
