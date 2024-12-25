import { Module } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { FloorsModule } from "src/floors/floors.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
	controllers: [RoomsController],
	providers: [RoomsService],
	imports: [PrismaModule, FloorsModule],
})
export class RoomsModule {}
