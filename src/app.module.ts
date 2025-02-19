import { Module } from "@nestjs/common";

import { ClassesModule } from "@resources/classes/classes.module";
import { SchoolsModule } from "@resources/schools/schools.module";
import { StudentsModule } from "@resources/students/students.module";
import { TeachersModule } from "@resources/teachers/teachers.module";

@Module({
	imports: [SchoolsModule, TeachersModule, ClassesModule, StudentsModule],
})
export class AppModule {}
