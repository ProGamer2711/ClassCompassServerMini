import { Module } from "@nestjs/common";

import { UsersModule } from "@resources/users/users.module";

import { PrismaModule } from "@prisma/prisma.module";

import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";

@Module({
	controllers: [TeachersController],
	providers: [TeachersService],
	imports: [PrismaModule, UsersModule],
	exports: [TeachersService],
})
export class TeachersModule {}
