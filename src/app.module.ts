import { Module } from "@nestjs/common";

import { BuildingsModule } from "@resources/buildings/buildings.module";
import { FloorsModule } from "@resources/floors/floors.module";
import { RoomsModule } from "@resources/rooms/rooms.module";
import { SchoolsModule } from "@resources/schools/schools.module";

import { ClassesModule } from "./resources/classes/classes.module";
import { DailySchedulesModule } from "./resources/daily-schedules/daily-schedules.module";
import { LessonsModule } from "./resources/lessons/lessons.module";
import { StudentsModule } from "./resources/students/students.module";
import { SubjectsModule } from "./resources/subjects/subjects.module";
import { TeachersModule } from "./resources/teachers/teachers.module";

@Module({
	imports: [
		SchoolsModule,
		BuildingsModule,
		FloorsModule,
		RoomsModule,
		TeachersModule,
		SubjectsModule,
		ClassesModule,
		StudentsModule,
		DailySchedulesModule,
		LessonsModule,
	],
})
export class AppModule {}
