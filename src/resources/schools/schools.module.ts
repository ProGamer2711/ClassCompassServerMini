import { Module } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { SchoolsController } from "./schools.controller";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
	controllers: [SchoolsController],
	providers: [SchoolsService],
	imports: [PrismaModule],
	exports: [SchoolsService],
})
export class SchoolsModule {}
