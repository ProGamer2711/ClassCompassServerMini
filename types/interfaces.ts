// This file was auto-generated by prisma-generator-typescript-interfaces

export type LessonWeek = "ODD" | "EVEN" | "BOTH";

export type Day =
	| "MONDAY"
	| "TUESDAY"
	| "WEDNESDAY"
	| "THURSDAY"
	| "FRIDAY"
	| "SATURDAY"
	| "SUNDAY";

export interface Teacher {
	id: string;
	name: string;
	schoolId: string;
	school?: School;
	lessons?: Lesson[];
	subjectIds: string[];
	subjects?: Subject[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Student {
	id: string;
	name: string;
	classId: string;
	class?: SchoolClass;
	createdAt: Date;
	updatedAt: Date;
}

export interface Subject {
	id: string;
	name: string;
	schoolId: string;
	school?: School;
	lessons?: Lesson[];
	teacherIds: string[];
	teachers?: Teacher[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Lesson {
	id: string;
	lessonNumber: number;
	startTime: Date;
	endTime: Date;
	lessonWeeks: LessonWeek;
	roomId: string;
	room?: Room;
	teacherId: string;
	teacher?: Teacher;
	subjectId: string;
	subject?: Subject;
	scheduleId: string;
	schedule?: Schedule;
	createdAt: Date;
	updatedAt: Date;
}

export interface Schedule {
	id: string;
	day: Day;
	classId: string;
	class?: SchoolClass;
	lessons?: Lesson[];
	createdAt: Date;
	updatedAt: Date;
}

export interface SchoolClass {
	id: string;
	name: string;
	schoolId: string;
	school?: School;
	students?: Student[];
	weeklySchedule?: Schedule[];
	createdAt: Date;
	updatedAt: Date;
}

export interface School {
	id: string;
	name: string;
	classes?: SchoolClass[];
	subjects?: Subject[];
	teachers?: Teacher[];
	buildings?: Building[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Building {
	id: string;
	name: string;
	schoolId: string;
	school?: School;
	floors?: Floor[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Floor {
	id: string;
	number: number;
	description: string | null;
	planFilename: string | null;
	maskFilename: string | null;
	buildingId: string;
	building?: Building;
	rooms?: Room[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Room {
	id: string;
	name: string;
	floorId: string;
	floor?: Floor;
	lessons?: Lesson[];
	createdAt: Date;
	updatedAt: Date;
}
