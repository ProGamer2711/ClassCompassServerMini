import { Module } from "@nestjs/common";

import { SchoolsModule } from "@resources/schools/schools.module";

import { PrismaModule } from "@prisma/prisma.module";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [PrismaModule, SchoolsModule],
})
export class UsersModule {}
