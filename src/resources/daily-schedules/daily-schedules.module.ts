import { forwardRef, Module } from "@nestjs/common";

import { ClassesModule } from "@resources/classes/classes.module";
import { LessonsModule } from "@resources/lessons/lessons.module";

import { PrismaModule } from "@prisma/prisma.module";

import { DailySchedulesController } from "./daily-schedules.controller";
import { DailySchedulesService } from "./daily-schedules.service";

@Module({
	controllers: [DailySchedulesController],
	providers: [DailySchedulesService],
	imports: [PrismaModule, ClassesModule, forwardRef(() => LessonsModule)],
	exports: [DailySchedulesService],
})
export class DailySchedulesModule {}
