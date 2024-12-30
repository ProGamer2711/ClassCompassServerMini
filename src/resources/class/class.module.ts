import { Module } from "@nestjs/common";
import { ClassService } from "./class.service";
import { ClassController } from "./class.controller";
import { SchoolsModule } from "@resources/schools/schools.module";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
	controllers: [ClassController],
	providers: [ClassService],
	imports: [PrismaModule, SchoolsModule],
	exports: [ClassService],
})
export class ClassModule {}
