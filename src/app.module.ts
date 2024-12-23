import { Module } from "@nestjs/common";
import { SchoolsModule } from "./schools/schools.module";
import { BuildingsModule } from './buildings/buildings.module';

@Module({
	imports: [SchoolsModule, BuildingsModule],
})
export class AppModule {}
