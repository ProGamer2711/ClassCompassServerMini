import { forwardRef, Module } from "@nestjs/common";

import { DailySchedulesModule } from "@resources/daily-schedules/daily-schedules.module";
import { RoomsModule } from "@resources/rooms/rooms.module";
import { SubjectsModule } from "@resources/subjects/subjects.module";
import { TeachersModule } from "@resources/teachers/teachers.module";

import { PrismaModule } from "@prisma/prisma.module";

import { LessonsController } from "./lessons.controller";
import { LessonsService } from "./lessons.service";

@Module({
	controllers: [LessonsController],
	providers: [LessonsService],
	imports: [
		PrismaModule,
		forwardRef(() => RoomsModule),
		forwardRef(() => TeachersModule),
		SubjectsModule,
		forwardRef(() => DailySchedulesModule),
	],
	exports: [LessonsService],
})
export class LessonsModule {}
