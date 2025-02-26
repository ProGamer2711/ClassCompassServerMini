import { forwardRef, Module } from "@nestjs/common";

import { RolesModule } from "@resources/roles/roles.module";
import { SchoolsModule } from "@resources/schools/schools.module";

import { PrismaModule } from "@prisma/prisma.module";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [PrismaModule, SchoolsModule, forwardRef(() => RolesModule)],
	exports: [UsersService],
})
export class UsersModule {}
