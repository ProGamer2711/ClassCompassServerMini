import { Module } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { SchoolsController } from "./schools.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
	controllers: [SchoolsController],
	providers: [SchoolsService],
	imports: [PrismaModule],
})
export class SchoolsModule {}
