import { forwardRef, Module } from "@nestjs/common";

import { FloorsModule } from "@resources/floors/floors.module";
import { LessonsModule } from "@resources/lessons/lessons.module";

import { PrismaModule } from "@prisma/prisma.module";

import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";

@Module({
	controllers: [RoomsController],
	providers: [RoomsService],
	imports: [PrismaModule, FloorsModule, forwardRef(() => LessonsModule)],
	exports: [RoomsService],
})
export class RoomsModule {}
