import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma/prisma.module";

import { SchoolsController } from "./schools.controller";
import { SchoolsService } from "./schools.service";

@Module({
	controllers: [SchoolsController],
	providers: [SchoolsService],
	imports: [PrismaModule],
	exports: [SchoolsService],
})
export class SchoolsModule {}
