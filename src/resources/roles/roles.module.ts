import { forwardRef, Module } from "@nestjs/common";

import { SchoolsModule } from "@resources/schools/schools.module";
import { UsersModule } from "@resources/users/users.module";

import { PrismaModule } from "@prisma/prisma.module";

import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [PrismaModule, SchoolsModule, forwardRef(() => UsersModule)],
	exports: [RolesService],
})
export class RolesModule {}
