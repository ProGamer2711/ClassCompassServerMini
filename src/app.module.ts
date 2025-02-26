import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ClassesModule } from "@resources/classes/classes.module";
import { SchoolsModule } from "@resources/schools/schools.module";
import { StudentsModule } from "@resources/students/students.module";
import { TeachersModule } from "@resources/teachers/teachers.module";

import { AuthModule } from "./resources/auth/auth.module";
import { RolesModule } from "./resources/roles/roles.module";
import { UsersModule } from "./resources/users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		SchoolsModule,
		TeachersModule,
		ClassesModule,
		StudentsModule,
		UsersModule,
		AuthModule,
		RolesModule,
	],
})
export class AppModule {}
