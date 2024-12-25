import { Module } from "@nestjs/common";
import { SchoolsModule } from "@resources/schools/schools.module";
import { BuildingsModule } from "@resources/buildings/buildings.module";
import { FloorsModule } from "@resources/floors/floors.module";
import { RoomsModule } from "@resources/rooms/rooms.module";
import { TeachersModule } from "./resources/teachers/teachers.module";

@Module({
	imports: [
		SchoolsModule,
		BuildingsModule,
		FloorsModule,
		RoomsModule,
		TeachersModule,
	],
})
export class AppModule {}
