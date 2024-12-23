import { Module } from "@nestjs/common";
import { SchoolsModule } from "./schools/schools.module";
import { BuildingsModule } from "./buildings/buildings.module";
import { FloorsModule } from './floors/floors.module';

@Module({
	imports: [SchoolsModule, BuildingsModule, FloorsModule],
})
export class AppModule {}
