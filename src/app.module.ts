import { Module } from "@nestjs/common";
import { SchoolsModule } from "@resources/schools/schools.module";
import { BuildingsModule } from "@resources/buildings/buildings.module";
import { FloorsModule } from "@resources/floors/floors.module";
import { RoomsModule } from "@resources/rooms/rooms.module";
import { TeachersModule } from "./resources/teachers/teachers.module";
import { SubjectsModule } from "./resources/subjects/subjects.module";
import { ClassModule } from "./resources/class/class.module";

@Module({
	imports: [
		SchoolsModule,
		BuildingsModule,
		FloorsModule,
		RoomsModule,
		TeachersModule,
		SubjectsModule,
		ClassModule,
	],
})
export class AppModule {}
