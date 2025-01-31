import { Module } from "@nestjs/common";

import { ClassesModule } from "@resources/classes/classes.module";

import { PrismaModule } from "@prisma/prisma.module";

import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";

@Module({
	controllers: [StudentsController],
	providers: [StudentsService],
	imports: [PrismaModule, ClassesModule],
})
export class StudentsModule {}
