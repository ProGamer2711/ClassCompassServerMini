import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { ClassesModule } from "@resources/classes/classes.module";

@Module({
	controllers: [StudentsController],
	providers: [StudentsService],
	imports: [PrismaModule, ClassesModule],
})
export class StudentsModule {}
