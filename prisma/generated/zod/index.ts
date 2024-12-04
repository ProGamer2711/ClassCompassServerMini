import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TeacherScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"schoolId",
	"subjectIds",
	"createdAt",
	"updatedAt",
]);

export const StudentScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"classId",
	"createdAt",
	"updatedAt",
]);

export const SubjectScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"schoolId",
	"teacherIds",
	"createdAt",
	"updatedAt",
]);

export const LessonScalarFieldEnumSchema = z.enum([
	"id",
	"lessonNumber",
	"startTime",
	"endTime",
	"lessonWeeks",
	"roomId",
	"teacherId",
	"subjectId",
	"scheduleId",
	"createdAt",
	"updatedAt",
]);

export const ScheduleScalarFieldEnumSchema = z.enum([
	"id",
	"day",
	"classId",
	"createdAt",
	"updatedAt",
]);

export const SchoolClassScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"schoolId",
	"createdAt",
	"updatedAt",
]);

export const SchoolScalarFieldEnumSchema = z.enum(["id", "name"]);

export const BuildingScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"schoolId",
	"createdAt",
	"updatedAt",
]);

export const FloorScalarFieldEnumSchema = z.enum([
	"id",
	"number",
	"description",
	"planFilename",
	"maskFilename",
	"buildingId",
	"createdAt",
	"updatedAt",
]);

export const RoomScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"floorId",
	"createdAt",
	"updatedAt",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const LessonWeekSchema = z.enum(["ODD", "EVEN", "BOTH"]);

export type LessonWeekType = `${z.infer<typeof LessonWeekSchema>}`;

export const DaySchema = z.enum([
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
	"SUNDAY",
]);

export type DayType = `${z.infer<typeof DaySchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TEACHER SCHEMA
/////////////////////////////////////////

export const TeacherSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
	schoolId: z.string(),
	subjectIds: z.string().array(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Teacher = z.infer<typeof TeacherSchema>;

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
	classId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Student = z.infer<typeof StudentSchema>;

/////////////////////////////////////////
// SUBJECT SCHEMA
/////////////////////////////////////////

export const SubjectSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
	schoolId: z.string(),
	teacherIds: z.string().array(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Subject = z.infer<typeof SubjectSchema>;

/////////////////////////////////////////
// LESSON SCHEMA
/////////////////////////////////////////

export const LessonSchema = z.object({
	lessonWeeks: LessonWeekSchema,
	id: z.string(),
	lessonNumber: z
		.number()
		.gte(0, {
			message: "Номерът на часа не може да бъде отрицателно число",
		}),
	startTime: z.coerce.date(),
	endTime: z.coerce.date(),
	roomId: z.string(),
	teacherId: z.string(),
	subjectId: z.string(),
	scheduleId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Lesson = z.infer<typeof LessonSchema>;

/////////////////////////////////////////
// SCHEDULE SCHEMA
/////////////////////////////////////////

export const ScheduleSchema = z.object({
	day: DaySchema,
	id: z.string(),
	classId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Schedule = z.infer<typeof ScheduleSchema>;

/////////////////////////////////////////
// SCHOOL CLASS SCHEMA
/////////////////////////////////////////

export const SchoolClassSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
	schoolId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type SchoolClass = z.infer<typeof SchoolClassSchema>;

/////////////////////////////////////////
// SCHOOL SCHEMA
/////////////////////////////////////////

export const SchoolSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
});

export type School = z.infer<typeof SchoolSchema>;

/////////////////////////////////////////
// BUILDING SCHEMA
/////////////////////////////////////////

export const BuildingSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
	schoolId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Building = z.infer<typeof BuildingSchema>;

/////////////////////////////////////////
// FLOOR SCHEMA
/////////////////////////////////////////

export const FloorSchema = z.object({
	id: z.string(),
	number: z.number().int(),
	description: z.string().nullable(),
	planFilename: z.string().nullable(),
	maskFilename: z.string().nullable(),
	buildingId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Floor = z.infer<typeof FloorSchema>;

/////////////////////////////////////////
// ROOM SCHEMA
/////////////////////////////////////////

export const RoomSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
	floorId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Room = z.infer<typeof RoomSchema>;

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TEACHER
//------------------------------------------------------

export const TeacherIncludeSchema: z.ZodType<Prisma.TeacherInclude> = z
	.object({})
	.strict();

export const TeacherArgsSchema: z.ZodType<Prisma.TeacherDefaultArgs> = z
	.object({
		select: z.lazy(() => TeacherSelectSchema).optional(),
		include: z.lazy(() => TeacherIncludeSchema).optional(),
	})
	.strict();

export const TeacherCountOutputTypeArgsSchema: z.ZodType<Prisma.TeacherCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => TeacherCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const TeacherCountOutputTypeSelectSchema: z.ZodType<Prisma.TeacherCountOutputTypeSelect> =
	z
		.object({
			lessons: z.boolean().optional(),
			subjects: z.boolean().optional(),
		})
		.strict();

export const TeacherSelectSchema: z.ZodType<Prisma.TeacherSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		schoolId: z.boolean().optional(),
		subjectIds: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		school: z
			.union([z.boolean(), z.lazy(() => SchoolArgsSchema)])
			.optional(),
		lessons: z
			.union([z.boolean(), z.lazy(() => LessonArgsSchema)])
			.optional(),
		subjects: z
			.union([z.boolean(), z.lazy(() => SubjectArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => TeacherCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

// STUDENT
//------------------------------------------------------

export const StudentIncludeSchema: z.ZodType<Prisma.StudentInclude> = z
	.object({})
	.strict();

export const StudentArgsSchema: z.ZodType<Prisma.StudentDefaultArgs> = z
	.object({
		select: z.lazy(() => StudentSelectSchema).optional(),
		include: z.lazy(() => StudentIncludeSchema).optional(),
	})
	.strict();

export const StudentSelectSchema: z.ZodType<Prisma.StudentSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		classId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		class: z
			.union([z.boolean(), z.lazy(() => SchoolClassArgsSchema)])
			.optional(),
	})
	.strict();

// SUBJECT
//------------------------------------------------------

export const SubjectIncludeSchema: z.ZodType<Prisma.SubjectInclude> = z
	.object({})
	.strict();

export const SubjectArgsSchema: z.ZodType<Prisma.SubjectDefaultArgs> = z
	.object({
		select: z.lazy(() => SubjectSelectSchema).optional(),
		include: z.lazy(() => SubjectIncludeSchema).optional(),
	})
	.strict();

export const SubjectCountOutputTypeArgsSchema: z.ZodType<Prisma.SubjectCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => SubjectCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const SubjectCountOutputTypeSelectSchema: z.ZodType<Prisma.SubjectCountOutputTypeSelect> =
	z
		.object({
			lessons: z.boolean().optional(),
			teachers: z.boolean().optional(),
		})
		.strict();

export const SubjectSelectSchema: z.ZodType<Prisma.SubjectSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		schoolId: z.boolean().optional(),
		teacherIds: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		school: z
			.union([z.boolean(), z.lazy(() => SchoolArgsSchema)])
			.optional(),
		lessons: z
			.union([z.boolean(), z.lazy(() => LessonArgsSchema)])
			.optional(),
		teachers: z
			.union([z.boolean(), z.lazy(() => TeacherArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => SubjectCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

// LESSON
//------------------------------------------------------

export const LessonIncludeSchema: z.ZodType<Prisma.LessonInclude> = z
	.object({})
	.strict();

export const LessonArgsSchema: z.ZodType<Prisma.LessonDefaultArgs> = z
	.object({
		select: z.lazy(() => LessonSelectSchema).optional(),
		include: z.lazy(() => LessonIncludeSchema).optional(),
	})
	.strict();

export const LessonSelectSchema: z.ZodType<Prisma.LessonSelect> = z
	.object({
		id: z.boolean().optional(),
		lessonNumber: z.boolean().optional(),
		startTime: z.boolean().optional(),
		endTime: z.boolean().optional(),
		lessonWeeks: z.boolean().optional(),
		roomId: z.boolean().optional(),
		teacherId: z.boolean().optional(),
		subjectId: z.boolean().optional(),
		scheduleId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		room: z.union([z.boolean(), z.lazy(() => RoomArgsSchema)]).optional(),
		teacher: z
			.union([z.boolean(), z.lazy(() => TeacherArgsSchema)])
			.optional(),
		subject: z
			.union([z.boolean(), z.lazy(() => SubjectArgsSchema)])
			.optional(),
		schedule: z
			.union([z.boolean(), z.lazy(() => ScheduleArgsSchema)])
			.optional(),
	})
	.strict();

// SCHEDULE
//------------------------------------------------------

export const ScheduleIncludeSchema: z.ZodType<Prisma.ScheduleInclude> = z
	.object({})
	.strict();

export const ScheduleArgsSchema: z.ZodType<Prisma.ScheduleDefaultArgs> = z
	.object({
		select: z.lazy(() => ScheduleSelectSchema).optional(),
		include: z.lazy(() => ScheduleIncludeSchema).optional(),
	})
	.strict();

export const ScheduleCountOutputTypeArgsSchema: z.ZodType<Prisma.ScheduleCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => ScheduleCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const ScheduleCountOutputTypeSelectSchema: z.ZodType<Prisma.ScheduleCountOutputTypeSelect> =
	z
		.object({
			lessons: z.boolean().optional(),
		})
		.strict();

export const ScheduleSelectSchema: z.ZodType<Prisma.ScheduleSelect> = z
	.object({
		id: z.boolean().optional(),
		day: z.boolean().optional(),
		classId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		class: z
			.union([z.boolean(), z.lazy(() => SchoolClassArgsSchema)])
			.optional(),
		lessons: z
			.union([z.boolean(), z.lazy(() => LessonArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => ScheduleCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

// SCHOOL CLASS
//------------------------------------------------------

export const SchoolClassIncludeSchema: z.ZodType<Prisma.SchoolClassInclude> = z
	.object({})
	.strict();

export const SchoolClassArgsSchema: z.ZodType<Prisma.SchoolClassDefaultArgs> = z
	.object({
		select: z.lazy(() => SchoolClassSelectSchema).optional(),
		include: z.lazy(() => SchoolClassIncludeSchema).optional(),
	})
	.strict();

export const SchoolClassCountOutputTypeArgsSchema: z.ZodType<Prisma.SchoolClassCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z
				.lazy(() => SchoolClassCountOutputTypeSelectSchema)
				.nullish(),
		})
		.strict();

export const SchoolClassCountOutputTypeSelectSchema: z.ZodType<Prisma.SchoolClassCountOutputTypeSelect> =
	z
		.object({
			students: z.boolean().optional(),
			weeklySchedule: z.boolean().optional(),
		})
		.strict();

export const SchoolClassSelectSchema: z.ZodType<Prisma.SchoolClassSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		schoolId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		school: z
			.union([z.boolean(), z.lazy(() => SchoolArgsSchema)])
			.optional(),
		students: z
			.union([z.boolean(), z.lazy(() => StudentArgsSchema)])
			.optional(),
		weeklySchedule: z
			.union([z.boolean(), z.lazy(() => ScheduleArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => SchoolClassCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

// SCHOOL
//------------------------------------------------------

export const SchoolIncludeSchema: z.ZodType<Prisma.SchoolInclude> = z
	.object({})
	.strict();

export const SchoolArgsSchema: z.ZodType<Prisma.SchoolDefaultArgs> = z
	.object({
		select: z.lazy(() => SchoolSelectSchema).optional(),
		include: z.lazy(() => SchoolIncludeSchema).optional(),
	})
	.strict();

export const SchoolCountOutputTypeArgsSchema: z.ZodType<Prisma.SchoolCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => SchoolCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const SchoolCountOutputTypeSelectSchema: z.ZodType<Prisma.SchoolCountOutputTypeSelect> =
	z
		.object({
			classes: z.boolean().optional(),
			subjects: z.boolean().optional(),
			teachers: z.boolean().optional(),
			buildings: z.boolean().optional(),
		})
		.strict();

export const SchoolSelectSchema: z.ZodType<Prisma.SchoolSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		classes: z
			.union([z.boolean(), z.lazy(() => SchoolClassArgsSchema)])
			.optional(),
		subjects: z
			.union([z.boolean(), z.lazy(() => SubjectArgsSchema)])
			.optional(),
		teachers: z
			.union([z.boolean(), z.lazy(() => TeacherArgsSchema)])
			.optional(),
		buildings: z
			.union([z.boolean(), z.lazy(() => BuildingArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => SchoolCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// BUILDING
//------------------------------------------------------

export const BuildingIncludeSchema: z.ZodType<Prisma.BuildingInclude> = z
	.object({})
	.strict();

export const BuildingArgsSchema: z.ZodType<Prisma.BuildingDefaultArgs> = z
	.object({
		select: z.lazy(() => BuildingSelectSchema).optional(),
		include: z.lazy(() => BuildingIncludeSchema).optional(),
	})
	.strict();

export const BuildingCountOutputTypeArgsSchema: z.ZodType<Prisma.BuildingCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => BuildingCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const BuildingCountOutputTypeSelectSchema: z.ZodType<Prisma.BuildingCountOutputTypeSelect> =
	z
		.object({
			floors: z.boolean().optional(),
		})
		.strict();

export const BuildingSelectSchema: z.ZodType<Prisma.BuildingSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		schoolId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		school: z
			.union([z.boolean(), z.lazy(() => SchoolArgsSchema)])
			.optional(),
		floors: z
			.union([z.boolean(), z.lazy(() => FloorArgsSchema)])
			.optional(),
		_count: z
			.union([
				z.boolean(),
				z.lazy(() => BuildingCountOutputTypeArgsSchema),
			])
			.optional(),
	})
	.strict();

// FLOOR
//------------------------------------------------------

export const FloorIncludeSchema: z.ZodType<Prisma.FloorInclude> = z
	.object({})
	.strict();

export const FloorArgsSchema: z.ZodType<Prisma.FloorDefaultArgs> = z
	.object({
		select: z.lazy(() => FloorSelectSchema).optional(),
		include: z.lazy(() => FloorIncludeSchema).optional(),
	})
	.strict();

export const FloorCountOutputTypeArgsSchema: z.ZodType<Prisma.FloorCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => FloorCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const FloorCountOutputTypeSelectSchema: z.ZodType<Prisma.FloorCountOutputTypeSelect> =
	z
		.object({
			rooms: z.boolean().optional(),
		})
		.strict();

export const FloorSelectSchema: z.ZodType<Prisma.FloorSelect> = z
	.object({
		id: z.boolean().optional(),
		number: z.boolean().optional(),
		description: z.boolean().optional(),
		planFilename: z.boolean().optional(),
		maskFilename: z.boolean().optional(),
		buildingId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		building: z
			.union([z.boolean(), z.lazy(() => BuildingArgsSchema)])
			.optional(),
		rooms: z.union([z.boolean(), z.lazy(() => RoomArgsSchema)]).optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => FloorCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// ROOM
//------------------------------------------------------

export const RoomIncludeSchema: z.ZodType<Prisma.RoomInclude> = z
	.object({})
	.strict();

export const RoomArgsSchema: z.ZodType<Prisma.RoomDefaultArgs> = z
	.object({
		select: z.lazy(() => RoomSelectSchema).optional(),
		include: z.lazy(() => RoomIncludeSchema).optional(),
	})
	.strict();

export const RoomCountOutputTypeArgsSchema: z.ZodType<Prisma.RoomCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => RoomCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const RoomCountOutputTypeSelectSchema: z.ZodType<Prisma.RoomCountOutputTypeSelect> =
	z
		.object({
			lessons: z.boolean().optional(),
		})
		.strict();

export const RoomSelectSchema: z.ZodType<Prisma.RoomSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		floorId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		floor: z.union([z.boolean(), z.lazy(() => FloorArgsSchema)]).optional(),
		lessons: z
			.union([z.boolean(), z.lazy(() => LessonArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => RoomCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TeacherWhereInputSchema: z.ZodType<Prisma.TeacherWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => TeacherWhereInputSchema),
				z.lazy(() => TeacherWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TeacherWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TeacherWhereInputSchema),
				z.lazy(() => TeacherWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		schoolId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		subjectIds: z.lazy(() => StringNullableListFilterSchema).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		school: z
			.union([
				z.lazy(() => SchoolRelationFilterSchema),
				z.lazy(() => SchoolWhereInputSchema),
			])
			.optional(),
		lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
		subjects: z.lazy(() => SubjectListRelationFilterSchema).optional(),
	})
	.strict();

export const TeacherOrderByWithRelationInputSchema: z.ZodType<Prisma.TeacherOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			subjectIds: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			school: z
				.lazy(() => SchoolOrderByWithRelationInputSchema)
				.optional(),
			lessons: z
				.lazy(() => LessonOrderByRelationAggregateInputSchema)
				.optional(),
			subjects: z
				.lazy(() => SubjectOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const TeacherWhereUniqueInputSchema: z.ZodType<Prisma.TeacherWhereUniqueInput> =
	z
		.object({
			id: z.string(),
		})
		.and(
			z
				.object({
					id: z.string().optional(),
					AND: z
						.union([
							z.lazy(() => TeacherWhereInputSchema),
							z.lazy(() => TeacherWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => TeacherWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => TeacherWhereInputSchema),
							z.lazy(() => TeacherWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([
							z.lazy(() => StringFilterSchema),
							z
								.string()
								.min(1, {
									message:
										"Името трябва да сърдържа поне 1 символ",
								}),
						])
						.optional(),
					schoolId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					subjectIds: z
						.lazy(() => StringNullableListFilterSchema)
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					school: z
						.union([
							z.lazy(() => SchoolRelationFilterSchema),
							z.lazy(() => SchoolWhereInputSchema),
						])
						.optional(),
					lessons: z
						.lazy(() => LessonListRelationFilterSchema)
						.optional(),
					subjects: z
						.lazy(() => SubjectListRelationFilterSchema)
						.optional(),
				})
				.strict()
		);

export const TeacherOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeacherOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			subjectIds: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => TeacherCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => TeacherMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => TeacherMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const TeacherScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeacherScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => TeacherScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => TeacherScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => TeacherScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => TeacherScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => TeacherScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			schoolId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			subjectIds: z.lazy(() => StringNullableListFilterSchema).optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const StudentWhereInputSchema: z.ZodType<Prisma.StudentWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => StudentWhereInputSchema),
				z.lazy(() => StudentWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => StudentWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => StudentWhereInputSchema),
				z.lazy(() => StudentWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		classId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		class: z
			.union([
				z.lazy(() => SchoolClassRelationFilterSchema),
				z.lazy(() => SchoolClassWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const StudentOrderByWithRelationInputSchema: z.ZodType<Prisma.StudentOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			class: z
				.lazy(() => SchoolClassOrderByWithRelationInputSchema)
				.optional(),
		})
		.strict();

export const StudentWhereUniqueInputSchema: z.ZodType<Prisma.StudentWhereUniqueInput> =
	z
		.object({
			id: z.string(),
		})
		.and(
			z
				.object({
					id: z.string().optional(),
					AND: z
						.union([
							z.lazy(() => StudentWhereInputSchema),
							z.lazy(() => StudentWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => StudentWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => StudentWhereInputSchema),
							z.lazy(() => StudentWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([
							z.lazy(() => StringFilterSchema),
							z
								.string()
								.min(1, {
									message:
										"Името трябва да сърдържа поне 1 символ",
								}),
						])
						.optional(),
					classId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					class: z
						.union([
							z.lazy(() => SchoolClassRelationFilterSchema),
							z.lazy(() => SchoolClassWhereInputSchema),
						])
						.optional(),
				})
				.strict()
		);

export const StudentOrderByWithAggregationInputSchema: z.ZodType<Prisma.StudentOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => StudentCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => StudentMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => StudentMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const StudentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StudentScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => StudentScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => StudentScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => StudentScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			classId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const SubjectWhereInputSchema: z.ZodType<Prisma.SubjectWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => SubjectWhereInputSchema),
				z.lazy(() => SubjectWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => SubjectWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => SubjectWhereInputSchema),
				z.lazy(() => SubjectWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		schoolId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		teacherIds: z.lazy(() => StringNullableListFilterSchema).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		school: z
			.union([
				z.lazy(() => SchoolRelationFilterSchema),
				z.lazy(() => SchoolWhereInputSchema),
			])
			.optional(),
		lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
		teachers: z.lazy(() => TeacherListRelationFilterSchema).optional(),
	})
	.strict();

export const SubjectOrderByWithRelationInputSchema: z.ZodType<Prisma.SubjectOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			teacherIds: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			school: z
				.lazy(() => SchoolOrderByWithRelationInputSchema)
				.optional(),
			lessons: z
				.lazy(() => LessonOrderByRelationAggregateInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const SubjectWhereUniqueInputSchema: z.ZodType<Prisma.SubjectWhereUniqueInput> =
	z
		.object({
			id: z.string(),
		})
		.and(
			z
				.object({
					id: z.string().optional(),
					AND: z
						.union([
							z.lazy(() => SubjectWhereInputSchema),
							z.lazy(() => SubjectWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => SubjectWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => SubjectWhereInputSchema),
							z.lazy(() => SubjectWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([
							z.lazy(() => StringFilterSchema),
							z
								.string()
								.min(1, {
									message:
										"Името трябва да сърдържа поне 1 символ",
								}),
						])
						.optional(),
					schoolId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					teacherIds: z
						.lazy(() => StringNullableListFilterSchema)
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					school: z
						.union([
							z.lazy(() => SchoolRelationFilterSchema),
							z.lazy(() => SchoolWhereInputSchema),
						])
						.optional(),
					lessons: z
						.lazy(() => LessonListRelationFilterSchema)
						.optional(),
					teachers: z
						.lazy(() => TeacherListRelationFilterSchema)
						.optional(),
				})
				.strict()
		);

export const SubjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubjectOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			teacherIds: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => SubjectCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => SubjectMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => SubjectMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const SubjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubjectScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => SubjectScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => SubjectScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => SubjectScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => SubjectScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => SubjectScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			schoolId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			teacherIds: z.lazy(() => StringNullableListFilterSchema).optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const LessonWhereInputSchema: z.ZodType<Prisma.LessonWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => LessonWhereInputSchema),
				z.lazy(() => LessonWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => LessonWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => LessonWhereInputSchema),
				z.lazy(() => LessonWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		lessonNumber: z
			.union([z.lazy(() => IntFilterSchema), z.number()])
			.optional(),
		startTime: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		endTime: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		lessonWeeks: z
			.union([
				z.lazy(() => EnumLessonWeekFilterSchema),
				z.lazy(() => LessonWeekSchema),
			])
			.optional(),
		roomId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		teacherId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		subjectId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		scheduleId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		room: z
			.union([
				z.lazy(() => RoomRelationFilterSchema),
				z.lazy(() => RoomWhereInputSchema),
			])
			.optional(),
		teacher: z
			.union([
				z.lazy(() => TeacherRelationFilterSchema),
				z.lazy(() => TeacherWhereInputSchema),
			])
			.optional(),
		subject: z
			.union([
				z.lazy(() => SubjectRelationFilterSchema),
				z.lazy(() => SubjectWhereInputSchema),
			])
			.optional(),
		schedule: z
			.union([
				z.lazy(() => ScheduleRelationFilterSchema),
				z.lazy(() => ScheduleWhereInputSchema),
			])
			.optional(),
	})
	.strict();

export const LessonOrderByWithRelationInputSchema: z.ZodType<Prisma.LessonOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			lessonNumber: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			lessonWeeks: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			teacherId: z.lazy(() => SortOrderSchema).optional(),
			subjectId: z.lazy(() => SortOrderSchema).optional(),
			scheduleId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			room: z.lazy(() => RoomOrderByWithRelationInputSchema).optional(),
			teacher: z
				.lazy(() => TeacherOrderByWithRelationInputSchema)
				.optional(),
			subject: z
				.lazy(() => SubjectOrderByWithRelationInputSchema)
				.optional(),
			schedule: z
				.lazy(() => ScheduleOrderByWithRelationInputSchema)
				.optional(),
		})
		.strict();

export const LessonWhereUniqueInputSchema: z.ZodType<Prisma.LessonWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				lessonNumber_lessonWeeks_scheduleId: z.lazy(
					() =>
						LessonLessonNumberLessonWeeksScheduleIdCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				lessonNumber_lessonWeeks_scheduleId: z.lazy(
					() =>
						LessonLessonNumberLessonWeeksScheduleIdCompoundUniqueInputSchema
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					lessonNumber_lessonWeeks_scheduleId: z
						.lazy(
							() =>
								LessonLessonNumberLessonWeeksScheduleIdCompoundUniqueInputSchema
						)
						.optional(),
					AND: z
						.union([
							z.lazy(() => LessonWhereInputSchema),
							z.lazy(() => LessonWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => LessonWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => LessonWhereInputSchema),
							z.lazy(() => LessonWhereInputSchema).array(),
						])
						.optional(),
					lessonNumber: z
						.union([
							z.lazy(() => IntFilterSchema),
							z
								.number()
								.gte(0, {
									message:
										"Номерът на часа не може да бъде отрицателно число",
								}),
						])
						.optional(),
					startTime: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					endTime: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					lessonWeeks: z
						.union([
							z.lazy(() => EnumLessonWeekFilterSchema),
							z.lazy(() => LessonWeekSchema),
						])
						.optional(),
					roomId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					teacherId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					subjectId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					scheduleId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					room: z
						.union([
							z.lazy(() => RoomRelationFilterSchema),
							z.lazy(() => RoomWhereInputSchema),
						])
						.optional(),
					teacher: z
						.union([
							z.lazy(() => TeacherRelationFilterSchema),
							z.lazy(() => TeacherWhereInputSchema),
						])
						.optional(),
					subject: z
						.union([
							z.lazy(() => SubjectRelationFilterSchema),
							z.lazy(() => SubjectWhereInputSchema),
						])
						.optional(),
					schedule: z
						.union([
							z.lazy(() => ScheduleRelationFilterSchema),
							z.lazy(() => ScheduleWhereInputSchema),
						])
						.optional(),
				})
				.strict()
		);

export const LessonOrderByWithAggregationInputSchema: z.ZodType<Prisma.LessonOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			lessonNumber: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			lessonWeeks: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			teacherId: z.lazy(() => SortOrderSchema).optional(),
			subjectId: z.lazy(() => SortOrderSchema).optional(),
			scheduleId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => LessonCountOrderByAggregateInputSchema)
				.optional(),
			_avg: z.lazy(() => LessonAvgOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => LessonMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => LessonMinOrderByAggregateInputSchema).optional(),
			_sum: z.lazy(() => LessonSumOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const LessonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LessonScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => LessonScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => LessonScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => LessonScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => LessonScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => LessonScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			lessonNumber: z
				.union([
					z.lazy(() => IntWithAggregatesFilterSchema),
					z.number(),
				])
				.optional(),
			startTime: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			endTime: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => EnumLessonWeekWithAggregatesFilterSchema),
					z.lazy(() => LessonWeekSchema),
				])
				.optional(),
			roomId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			teacherId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			subjectId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			scheduleId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const ScheduleWhereInputSchema: z.ZodType<Prisma.ScheduleWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => ScheduleWhereInputSchema),
				z.lazy(() => ScheduleWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ScheduleWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ScheduleWhereInputSchema),
				z.lazy(() => ScheduleWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		day: z
			.union([z.lazy(() => EnumDayFilterSchema), z.lazy(() => DaySchema)])
			.optional(),
		classId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		class: z
			.union([
				z.lazy(() => SchoolClassRelationFilterSchema),
				z.lazy(() => SchoolClassWhereInputSchema),
			])
			.optional(),
		lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
	})
	.strict();

export const ScheduleOrderByWithRelationInputSchema: z.ZodType<Prisma.ScheduleOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			day: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			class: z
				.lazy(() => SchoolClassOrderByWithRelationInputSchema)
				.optional(),
			lessons: z
				.lazy(() => LessonOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const ScheduleWhereUniqueInputSchema: z.ZodType<Prisma.ScheduleWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				day_classId: z.lazy(
					() => ScheduleDayClassIdCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				day_classId: z.lazy(
					() => ScheduleDayClassIdCompoundUniqueInputSchema
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					day_classId: z
						.lazy(() => ScheduleDayClassIdCompoundUniqueInputSchema)
						.optional(),
					AND: z
						.union([
							z.lazy(() => ScheduleWhereInputSchema),
							z.lazy(() => ScheduleWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => ScheduleWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => ScheduleWhereInputSchema),
							z.lazy(() => ScheduleWhereInputSchema).array(),
						])
						.optional(),
					day: z
						.union([
							z.lazy(() => EnumDayFilterSchema),
							z.lazy(() => DaySchema),
						])
						.optional(),
					classId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					class: z
						.union([
							z.lazy(() => SchoolClassRelationFilterSchema),
							z.lazy(() => SchoolClassWhereInputSchema),
						])
						.optional(),
					lessons: z
						.lazy(() => LessonListRelationFilterSchema)
						.optional(),
				})
				.strict()
		);

export const ScheduleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ScheduleOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			day: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => ScheduleCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => ScheduleMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => ScheduleMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const ScheduleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ScheduleScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ScheduleScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => ScheduleScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => ScheduleScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ScheduleScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => ScheduleScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			day: z
				.union([
					z.lazy(() => EnumDayWithAggregatesFilterSchema),
					z.lazy(() => DaySchema),
				])
				.optional(),
			classId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassWhereInputSchema: z.ZodType<Prisma.SchoolClassWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => SchoolClassWhereInputSchema),
					z.lazy(() => SchoolClassWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => SchoolClassWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => SchoolClassWhereInputSchema),
					z.lazy(() => SchoolClassWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			schoolId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			school: z
				.union([
					z.lazy(() => SchoolRelationFilterSchema),
					z.lazy(() => SchoolWhereInputSchema),
				])
				.optional(),
			students: z.lazy(() => StudentListRelationFilterSchema).optional(),
			weeklySchedule: z
				.lazy(() => ScheduleListRelationFilterSchema)
				.optional(),
		})
		.strict();

export const SchoolClassOrderByWithRelationInputSchema: z.ZodType<Prisma.SchoolClassOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			school: z
				.lazy(() => SchoolOrderByWithRelationInputSchema)
				.optional(),
			students: z
				.lazy(() => StudentOrderByRelationAggregateInputSchema)
				.optional(),
			weeklySchedule: z
				.lazy(() => ScheduleOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassWhereUniqueInputSchema: z.ZodType<Prisma.SchoolClassWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				schoolId_name: z.lazy(
					() => SchoolClassSchoolIdNameCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				schoolId_name: z.lazy(
					() => SchoolClassSchoolIdNameCompoundUniqueInputSchema
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					schoolId_name: z
						.lazy(
							() =>
								SchoolClassSchoolIdNameCompoundUniqueInputSchema
						)
						.optional(),
					AND: z
						.union([
							z.lazy(() => SchoolClassWhereInputSchema),
							z.lazy(() => SchoolClassWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => SchoolClassWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => SchoolClassWhereInputSchema),
							z.lazy(() => SchoolClassWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([
							z.lazy(() => StringFilterSchema),
							z
								.string()
								.min(1, {
									message:
										"Името трябва да сърдържа поне 1 символ",
								}),
						])
						.optional(),
					schoolId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					school: z
						.union([
							z.lazy(() => SchoolRelationFilterSchema),
							z.lazy(() => SchoolWhereInputSchema),
						])
						.optional(),
					students: z
						.lazy(() => StudentListRelationFilterSchema)
						.optional(),
					weeklySchedule: z
						.lazy(() => ScheduleListRelationFilterSchema)
						.optional(),
				})
				.strict()
		);

export const SchoolClassOrderByWithAggregationInputSchema: z.ZodType<Prisma.SchoolClassOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => SchoolClassCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => SchoolClassMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => SchoolClassMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SchoolClassScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(
						() => SchoolClassScalarWhereWithAggregatesInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => SchoolClassScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(
						() => SchoolClassScalarWhereWithAggregatesInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			schoolId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const SchoolWhereInputSchema: z.ZodType<Prisma.SchoolWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => SchoolWhereInputSchema),
				z.lazy(() => SchoolWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => SchoolWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => SchoolWhereInputSchema),
				z.lazy(() => SchoolWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		classes: z.lazy(() => SchoolClassListRelationFilterSchema).optional(),
		subjects: z.lazy(() => SubjectListRelationFilterSchema).optional(),
		teachers: z.lazy(() => TeacherListRelationFilterSchema).optional(),
		buildings: z.lazy(() => BuildingListRelationFilterSchema).optional(),
	})
	.strict();

export const SchoolOrderByWithRelationInputSchema: z.ZodType<Prisma.SchoolOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			classes: z
				.lazy(() => SchoolClassOrderByRelationAggregateInputSchema)
				.optional(),
			subjects: z
				.lazy(() => SubjectOrderByRelationAggregateInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherOrderByRelationAggregateInputSchema)
				.optional(),
			buildings: z
				.lazy(() => BuildingOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const SchoolWhereUniqueInputSchema: z.ZodType<Prisma.SchoolWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				name: z
					.string()
					.min(1, {
						message: "Името трябва да сърдържа поне 1 символ",
					}),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				name: z
					.string()
					.min(1, {
						message: "Името трябва да сърдържа поне 1 символ",
					}),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					name: z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						})
						.optional(),
					AND: z
						.union([
							z.lazy(() => SchoolWhereInputSchema),
							z.lazy(() => SchoolWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => SchoolWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => SchoolWhereInputSchema),
							z.lazy(() => SchoolWhereInputSchema).array(),
						])
						.optional(),
					classes: z
						.lazy(() => SchoolClassListRelationFilterSchema)
						.optional(),
					subjects: z
						.lazy(() => SubjectListRelationFilterSchema)
						.optional(),
					teachers: z
						.lazy(() => TeacherListRelationFilterSchema)
						.optional(),
					buildings: z
						.lazy(() => BuildingListRelationFilterSchema)
						.optional(),
				})
				.strict()
		);

export const SchoolOrderByWithAggregationInputSchema: z.ZodType<Prisma.SchoolOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => SchoolCountOrderByAggregateInputSchema)
				.optional(),
			_max: z.lazy(() => SchoolMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => SchoolMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const SchoolScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SchoolScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => SchoolScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => SchoolScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => SchoolScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => SchoolScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => SchoolScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
		})
		.strict();

export const BuildingWhereInputSchema: z.ZodType<Prisma.BuildingWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => BuildingWhereInputSchema),
				z.lazy(() => BuildingWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => BuildingWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => BuildingWhereInputSchema),
				z.lazy(() => BuildingWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		schoolId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		school: z
			.union([
				z.lazy(() => SchoolRelationFilterSchema),
				z.lazy(() => SchoolWhereInputSchema),
			])
			.optional(),
		floors: z.lazy(() => FloorListRelationFilterSchema).optional(),
	})
	.strict();

export const BuildingOrderByWithRelationInputSchema: z.ZodType<Prisma.BuildingOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			school: z
				.lazy(() => SchoolOrderByWithRelationInputSchema)
				.optional(),
			floors: z
				.lazy(() => FloorOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const BuildingWhereUniqueInputSchema: z.ZodType<Prisma.BuildingWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				schoolId_name: z.lazy(
					() => BuildingSchoolIdNameCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				schoolId_name: z.lazy(
					() => BuildingSchoolIdNameCompoundUniqueInputSchema
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					schoolId_name: z
						.lazy(
							() => BuildingSchoolIdNameCompoundUniqueInputSchema
						)
						.optional(),
					AND: z
						.union([
							z.lazy(() => BuildingWhereInputSchema),
							z.lazy(() => BuildingWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => BuildingWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => BuildingWhereInputSchema),
							z.lazy(() => BuildingWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([
							z.lazy(() => StringFilterSchema),
							z
								.string()
								.min(1, {
									message:
										"Името трябва да сърдържа поне 1 символ",
								}),
						])
						.optional(),
					schoolId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					school: z
						.union([
							z.lazy(() => SchoolRelationFilterSchema),
							z.lazy(() => SchoolWhereInputSchema),
						])
						.optional(),
					floors: z
						.lazy(() => FloorListRelationFilterSchema)
						.optional(),
				})
				.strict()
		);

export const BuildingOrderByWithAggregationInputSchema: z.ZodType<Prisma.BuildingOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => BuildingCountOrderByAggregateInputSchema)
				.optional(),
			_max: z
				.lazy(() => BuildingMaxOrderByAggregateInputSchema)
				.optional(),
			_min: z
				.lazy(() => BuildingMinOrderByAggregateInputSchema)
				.optional(),
		})
		.strict();

export const BuildingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BuildingScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => BuildingScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => BuildingScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => BuildingScalarWhereWithAggregatesInputSchema),
					z
						.lazy(
							() => BuildingScalarWhereWithAggregatesInputSchema
						)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			schoolId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const FloorWhereInputSchema: z.ZodType<Prisma.FloorWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => FloorWhereInputSchema),
				z.lazy(() => FloorWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => FloorWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => FloorWhereInputSchema),
				z.lazy(() => FloorWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		number: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		description: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		planFilename: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		maskFilename: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		buildingId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		building: z
			.union([
				z.lazy(() => BuildingRelationFilterSchema),
				z.lazy(() => BuildingWhereInputSchema),
			])
			.optional(),
		rooms: z.lazy(() => RoomListRelationFilterSchema).optional(),
	})
	.strict();

export const FloorOrderByWithRelationInputSchema: z.ZodType<Prisma.FloorOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			number: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			planFilename: z.lazy(() => SortOrderSchema).optional(),
			maskFilename: z.lazy(() => SortOrderSchema).optional(),
			buildingId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			building: z
				.lazy(() => BuildingOrderByWithRelationInputSchema)
				.optional(),
			rooms: z
				.lazy(() => RoomOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const FloorWhereUniqueInputSchema: z.ZodType<Prisma.FloorWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				planFilename: z.string(),
				maskFilename: z.string(),
				buildingId_number: z.lazy(
					() => FloorBuildingIdNumberCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
				planFilename: z.string(),
				maskFilename: z.string(),
			}),
			z.object({
				id: z.string(),
				planFilename: z.string(),
				buildingId_number: z.lazy(
					() => FloorBuildingIdNumberCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
				planFilename: z.string(),
			}),
			z.object({
				id: z.string(),
				maskFilename: z.string(),
				buildingId_number: z.lazy(
					() => FloorBuildingIdNumberCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
				maskFilename: z.string(),
			}),
			z.object({
				id: z.string(),
				buildingId_number: z.lazy(
					() => FloorBuildingIdNumberCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				planFilename: z.string(),
				maskFilename: z.string(),
				buildingId_number: z.lazy(
					() => FloorBuildingIdNumberCompoundUniqueInputSchema
				),
			}),
			z.object({
				planFilename: z.string(),
				maskFilename: z.string(),
			}),
			z.object({
				planFilename: z.string(),
				buildingId_number: z.lazy(
					() => FloorBuildingIdNumberCompoundUniqueInputSchema
				),
			}),
			z.object({
				planFilename: z.string(),
			}),
			z.object({
				maskFilename: z.string(),
				buildingId_number: z.lazy(
					() => FloorBuildingIdNumberCompoundUniqueInputSchema
				),
			}),
			z.object({
				maskFilename: z.string(),
			}),
			z.object({
				buildingId_number: z.lazy(
					() => FloorBuildingIdNumberCompoundUniqueInputSchema
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					planFilename: z.string().optional(),
					maskFilename: z.string().optional(),
					buildingId_number: z
						.lazy(
							() => FloorBuildingIdNumberCompoundUniqueInputSchema
						)
						.optional(),
					AND: z
						.union([
							z.lazy(() => FloorWhereInputSchema),
							z.lazy(() => FloorWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => FloorWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => FloorWhereInputSchema),
							z.lazy(() => FloorWhereInputSchema).array(),
						])
						.optional(),
					number: z
						.union([
							z.lazy(() => IntFilterSchema),
							z.number().int(),
						])
						.optional(),
					description: z
						.union([
							z.lazy(() => StringNullableFilterSchema),
							z.string(),
						])
						.optional()
						.nullable(),
					buildingId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					building: z
						.union([
							z.lazy(() => BuildingRelationFilterSchema),
							z.lazy(() => BuildingWhereInputSchema),
						])
						.optional(),
					rooms: z
						.lazy(() => RoomListRelationFilterSchema)
						.optional(),
				})
				.strict()
		);

export const FloorOrderByWithAggregationInputSchema: z.ZodType<Prisma.FloorOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			number: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			planFilename: z.lazy(() => SortOrderSchema).optional(),
			maskFilename: z.lazy(() => SortOrderSchema).optional(),
			buildingId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => FloorCountOrderByAggregateInputSchema)
				.optional(),
			_avg: z.lazy(() => FloorAvgOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => FloorMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => FloorMinOrderByAggregateInputSchema).optional(),
			_sum: z.lazy(() => FloorSumOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const FloorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FloorScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => FloorScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => FloorScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => FloorScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => FloorScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => FloorScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			number: z
				.union([
					z.lazy(() => IntWithAggregatesFilterSchema),
					z.number(),
				])
				.optional(),
			description: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.lazy(() => StringNullableWithAggregatesFilterSchema),
					z.string(),
				])
				.optional()
				.nullable(),
			buildingId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const RoomWhereInputSchema: z.ZodType<Prisma.RoomWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => RoomWhereInputSchema),
				z.lazy(() => RoomWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => RoomWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => RoomWhereInputSchema),
				z.lazy(() => RoomWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		floorId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		floor: z
			.union([
				z.lazy(() => FloorRelationFilterSchema),
				z.lazy(() => FloorWhereInputSchema),
			])
			.optional(),
		lessons: z.lazy(() => LessonListRelationFilterSchema).optional(),
	})
	.strict();

export const RoomOrderByWithRelationInputSchema: z.ZodType<Prisma.RoomOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			floorId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			floor: z.lazy(() => FloorOrderByWithRelationInputSchema).optional(),
			lessons: z
				.lazy(() => LessonOrderByRelationAggregateInputSchema)
				.optional(),
		})
		.strict();

export const RoomWhereUniqueInputSchema: z.ZodType<Prisma.RoomWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.string(),
				floorId_name: z.lazy(
					() => RoomFloorIdNameCompoundUniqueInputSchema
				),
			}),
			z.object({
				id: z.string(),
			}),
			z.object({
				floorId_name: z.lazy(
					() => RoomFloorIdNameCompoundUniqueInputSchema
				),
			}),
		])
		.and(
			z
				.object({
					id: z.string().optional(),
					floorId_name: z
						.lazy(() => RoomFloorIdNameCompoundUniqueInputSchema)
						.optional(),
					AND: z
						.union([
							z.lazy(() => RoomWhereInputSchema),
							z.lazy(() => RoomWhereInputSchema).array(),
						])
						.optional(),
					OR: z
						.lazy(() => RoomWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => RoomWhereInputSchema),
							z.lazy(() => RoomWhereInputSchema).array(),
						])
						.optional(),
					name: z
						.union([
							z.lazy(() => StringFilterSchema),
							z
								.string()
								.min(1, {
									message:
										"Името трябва да сърдържа поне 1 символ",
								}),
						])
						.optional(),
					floorId: z
						.union([z.lazy(() => StringFilterSchema), z.string()])
						.optional(),
					createdAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					updatedAt: z
						.union([
							z.lazy(() => DateTimeFilterSchema),
							z.coerce.date(),
						])
						.optional(),
					floor: z
						.union([
							z.lazy(() => FloorRelationFilterSchema),
							z.lazy(() => FloorWhereInputSchema),
						])
						.optional(),
					lessons: z
						.lazy(() => LessonListRelationFilterSchema)
						.optional(),
				})
				.strict()
		);

export const RoomOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoomOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			floorId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z
				.lazy(() => RoomCountOrderByAggregateInputSchema)
				.optional(),
			_max: z.lazy(() => RoomMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => RoomMinOrderByAggregateInputSchema).optional(),
		})
		.strict();

export const RoomScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoomScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => RoomScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			OR: z
				.lazy(() => RoomScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => RoomScalarWhereWithAggregatesInputSchema),
					z
						.lazy(() => RoomScalarWhereWithAggregatesInputSchema)
						.array(),
				])
				.optional(),
			id: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			floorId: z
				.union([
					z.lazy(() => StringWithAggregatesFilterSchema),
					z.string(),
				])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterSchema),
					z.coerce.date(),
				])
				.optional(),
		})
		.strict();

export const TeacherCreateInputSchema: z.ZodType<Prisma.TeacherCreateInput> = z
	.object({
		id: z.string().optional(),
		name: z
			.string()
			.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		school: z.lazy(() => SchoolCreateNestedOneWithoutTeachersInputSchema),
		lessons: z
			.lazy(() => LessonCreateNestedManyWithoutTeacherInputSchema)
			.optional(),
		subjects: z
			.lazy(() => SubjectCreateNestedManyWithoutTeachersInputSchema)
			.optional(),
	})
	.strict();

export const TeacherUncheckedCreateInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherCreatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedCreateNestedManyWithoutTeacherInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedCreateNestedManyWithoutTeachersInputSchema
				)
				.optional(),
		})
		.strict();

export const TeacherUpdateInputSchema: z.ZodType<Prisma.TeacherUpdateInput> = z
	.object({
		name: z
			.union([
				z
					.string()
					.min(1, {
						message: "Името трябва да сърдържа поне 1 символ",
					}),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		school: z
			.lazy(() => SchoolUpdateOneRequiredWithoutTeachersNestedInputSchema)
			.optional(),
		lessons: z
			.lazy(() => LessonUpdateManyWithoutTeacherNestedInputSchema)
			.optional(),
		subjects: z
			.lazy(() => SubjectUpdateManyWithoutTeachersNestedInputSchema)
			.optional(),
	})
	.strict();

export const TeacherUncheckedUpdateInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherUpdatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedUpdateManyWithoutTeacherNestedInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedUpdateManyWithoutTeachersNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const TeacherCreateManyInputSchema: z.ZodType<Prisma.TeacherCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherCreatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const TeacherUpdateManyMutationInputSchema: z.ZodType<Prisma.TeacherUpdateManyMutationInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TeacherUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateManyInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherUpdatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StudentCreateInputSchema: z.ZodType<Prisma.StudentCreateInput> = z
	.object({
		id: z.string().optional(),
		name: z
			.string()
			.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		class: z.lazy(
			() => SchoolClassCreateNestedOneWithoutStudentsInputSchema
		),
	})
	.strict();

export const StudentUncheckedCreateInputSchema: z.ZodType<Prisma.StudentUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const StudentUpdateInputSchema: z.ZodType<Prisma.StudentUpdateInput> = z
	.object({
		name: z
			.union([
				z
					.string()
					.min(1, {
						message: "Името трябва да сърдържа поне 1 символ",
					}),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		class: z
			.lazy(
				() =>
					SchoolClassUpdateOneRequiredWithoutStudentsNestedInputSchema
			)
			.optional(),
	})
	.strict();

export const StudentUncheckedUpdateInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StudentCreateManyInputSchema: z.ZodType<Prisma.StudentCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const StudentUpdateManyMutationInputSchema: z.ZodType<Prisma.StudentUpdateManyMutationInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StudentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SubjectCreateInputSchema: z.ZodType<Prisma.SubjectCreateInput> = z
	.object({
		id: z.string().optional(),
		name: z
			.string()
			.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		school: z.lazy(() => SchoolCreateNestedOneWithoutSubjectsInputSchema),
		lessons: z
			.lazy(() => LessonCreateNestedManyWithoutSubjectInputSchema)
			.optional(),
		teachers: z
			.lazy(() => TeacherCreateNestedManyWithoutSubjectsInputSchema)
			.optional(),
	})
	.strict();

export const SubjectUncheckedCreateInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectCreateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedCreateNestedManyWithoutSubjectInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedCreateNestedManyWithoutSubjectsInputSchema
				)
				.optional(),
		})
		.strict();

export const SubjectUpdateInputSchema: z.ZodType<Prisma.SubjectUpdateInput> = z
	.object({
		name: z
			.union([
				z
					.string()
					.min(1, {
						message: "Името трябва да сърдържа поне 1 символ",
					}),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		school: z
			.lazy(() => SchoolUpdateOneRequiredWithoutSubjectsNestedInputSchema)
			.optional(),
		lessons: z
			.lazy(() => LessonUpdateManyWithoutSubjectNestedInputSchema)
			.optional(),
		teachers: z
			.lazy(() => TeacherUpdateManyWithoutSubjectsNestedInputSchema)
			.optional(),
	})
	.strict();

export const SubjectUncheckedUpdateInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectUpdateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedUpdateManyWithoutSubjectNestedInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedUpdateManyWithoutSubjectsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const SubjectCreateManyInputSchema: z.ZodType<Prisma.SubjectCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectCreateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const SubjectUpdateManyMutationInputSchema: z.ZodType<Prisma.SubjectUpdateManyMutationInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SubjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateManyInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectUpdateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonCreateInputSchema: z.ZodType<Prisma.LessonCreateInput> = z
	.object({
		id: z.string().optional(),
		lessonNumber: z
			.number()
			.gte(0, {
				message: "Номерът на часа не може да бъде отрицателно число",
			}),
		startTime: z.coerce.date(),
		endTime: z.coerce.date(),
		lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		room: z.lazy(() => RoomCreateNestedOneWithoutLessonsInputSchema),
		teacher: z.lazy(() => TeacherCreateNestedOneWithoutLessonsInputSchema),
		subject: z.lazy(() => SubjectCreateNestedOneWithoutLessonsInputSchema),
		schedule: z.lazy(
			() => ScheduleCreateNestedOneWithoutLessonsInputSchema
		),
	})
	.strict();

export const LessonUncheckedCreateInputSchema: z.ZodType<Prisma.LessonUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			roomId: z.string(),
			teacherId: z.string(),
			subjectId: z.string(),
			scheduleId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonUpdateInputSchema: z.ZodType<Prisma.LessonUpdateInput> = z
	.object({
		lessonNumber: z
			.union([
				z
					.number()
					.gte(0, {
						message:
							"Номерът на часа не може да бъде отрицателно число",
					}),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		startTime: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		endTime: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lessonWeeks: z
			.union([
				z.lazy(() => LessonWeekSchema),
				z.lazy(() => EnumLessonWeekFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		room: z
			.lazy(() => RoomUpdateOneRequiredWithoutLessonsNestedInputSchema)
			.optional(),
		teacher: z
			.lazy(() => TeacherUpdateOneRequiredWithoutLessonsNestedInputSchema)
			.optional(),
		subject: z
			.lazy(() => SubjectUpdateOneRequiredWithoutLessonsNestedInputSchema)
			.optional(),
		schedule: z
			.lazy(
				() => ScheduleUpdateOneRequiredWithoutLessonsNestedInputSchema
			)
			.optional(),
	})
	.strict();

export const LessonUncheckedUpdateInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			scheduleId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonCreateManyInputSchema: z.ZodType<Prisma.LessonCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			roomId: z.string(),
			teacherId: z.string(),
			subjectId: z.string(),
			scheduleId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonUpdateManyMutationInputSchema: z.ZodType<Prisma.LessonUpdateManyMutationInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			scheduleId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ScheduleCreateInputSchema: z.ZodType<Prisma.ScheduleCreateInput> =
	z
		.object({
			id: z.string().optional(),
			day: z.lazy(() => DaySchema),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			class: z.lazy(
				() => SchoolClassCreateNestedOneWithoutWeeklyScheduleInputSchema
			),
			lessons: z
				.lazy(() => LessonCreateNestedManyWithoutScheduleInputSchema)
				.optional(),
		})
		.strict();

export const ScheduleUncheckedCreateInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			day: z.lazy(() => DaySchema),
			classId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedCreateNestedManyWithoutScheduleInputSchema
				)
				.optional(),
		})
		.strict();

export const ScheduleUpdateInputSchema: z.ZodType<Prisma.ScheduleUpdateInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			class: z
				.lazy(
					() =>
						SchoolClassUpdateOneRequiredWithoutWeeklyScheduleNestedInputSchema
				)
				.optional(),
			lessons: z
				.lazy(() => LessonUpdateManyWithoutScheduleNestedInputSchema)
				.optional(),
		})
		.strict();

export const ScheduleUncheckedUpdateInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedUpdateManyWithoutScheduleNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ScheduleCreateManyInputSchema: z.ZodType<Prisma.ScheduleCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			day: z.lazy(() => DaySchema),
			classId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const ScheduleUpdateManyMutationInputSchema: z.ZodType<Prisma.ScheduleUpdateManyMutationInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ScheduleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SchoolClassCreateInputSchema: z.ZodType<Prisma.SchoolClassCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutClassesInputSchema
			),
			students: z
				.lazy(() => StudentCreateNestedManyWithoutClassInputSchema)
				.optional(),
			weeklySchedule: z
				.lazy(() => ScheduleCreateNestedManyWithoutClassInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedCreateInputSchema: z.ZodType<Prisma.SchoolClassUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			students: z
				.lazy(
					() =>
						StudentUncheckedCreateNestedManyWithoutClassInputSchema
				)
				.optional(),
			weeklySchedule: z
				.lazy(
					() =>
						ScheduleUncheckedCreateNestedManyWithoutClassInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolClassUpdateInputSchema: z.ZodType<Prisma.SchoolClassUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() => SchoolUpdateOneRequiredWithoutClassesNestedInputSchema
				)
				.optional(),
			students: z
				.lazy(() => StudentUpdateManyWithoutClassNestedInputSchema)
				.optional(),
			weeklySchedule: z
				.lazy(() => ScheduleUpdateManyWithoutClassNestedInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedUpdateInputSchema: z.ZodType<Prisma.SchoolClassUncheckedUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			students: z
				.lazy(
					() =>
						StudentUncheckedUpdateManyWithoutClassNestedInputSchema
				)
				.optional(),
			weeklySchedule: z
				.lazy(
					() =>
						ScheduleUncheckedUpdateManyWithoutClassNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolClassCreateManyInputSchema: z.ZodType<Prisma.SchoolClassCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const SchoolClassUpdateManyMutationInputSchema: z.ZodType<Prisma.SchoolClassUpdateManyMutationInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SchoolClassUncheckedUpdateManyInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SchoolCreateInputSchema: z.ZodType<Prisma.SchoolCreateInput> = z
	.object({
		id: z.string().optional(),
		name: z
			.string()
			.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
		classes: z
			.lazy(() => SchoolClassCreateNestedManyWithoutSchoolInputSchema)
			.optional(),
		subjects: z
			.lazy(() => SubjectCreateNestedManyWithoutSchoolInputSchema)
			.optional(),
		teachers: z
			.lazy(() => TeacherCreateNestedManyWithoutSchoolInputSchema)
			.optional(),
		buildings: z
			.lazy(() => BuildingCreateNestedManyWithoutSchoolInputSchema)
			.optional(),
	})
	.strict();

export const SchoolUncheckedCreateInputSchema: z.ZodType<Prisma.SchoolUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classes: z
				.lazy(
					() =>
						SchoolClassUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			buildings: z
				.lazy(
					() =>
						BuildingUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolUpdateInputSchema: z.ZodType<Prisma.SchoolUpdateInput> = z
	.object({
		name: z
			.union([
				z
					.string()
					.min(1, {
						message: "Името трябва да сърдържа поне 1 символ",
					}),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		classes: z
			.lazy(() => SchoolClassUpdateManyWithoutSchoolNestedInputSchema)
			.optional(),
		subjects: z
			.lazy(() => SubjectUpdateManyWithoutSchoolNestedInputSchema)
			.optional(),
		teachers: z
			.lazy(() => TeacherUpdateManyWithoutSchoolNestedInputSchema)
			.optional(),
		buildings: z
			.lazy(() => BuildingUpdateManyWithoutSchoolNestedInputSchema)
			.optional(),
	})
	.strict();

export const SchoolUncheckedUpdateInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classes: z
				.lazy(
					() =>
						SchoolClassUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			buildings: z
				.lazy(
					() =>
						BuildingUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolCreateManyInputSchema: z.ZodType<Prisma.SchoolCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
		})
		.strict();

export const SchoolUpdateManyMutationInputSchema: z.ZodType<Prisma.SchoolUpdateManyMutationInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SchoolUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateManyInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const BuildingCreateInputSchema: z.ZodType<Prisma.BuildingCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutBuildingsInputSchema
			),
			floors: z
				.lazy(() => FloorCreateNestedManyWithoutBuildingInputSchema)
				.optional(),
		})
		.strict();

export const BuildingUncheckedCreateInputSchema: z.ZodType<Prisma.BuildingUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			floors: z
				.lazy(
					() =>
						FloorUncheckedCreateNestedManyWithoutBuildingInputSchema
				)
				.optional(),
		})
		.strict();

export const BuildingUpdateInputSchema: z.ZodType<Prisma.BuildingUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() =>
						SchoolUpdateOneRequiredWithoutBuildingsNestedInputSchema
				)
				.optional(),
			floors: z
				.lazy(() => FloorUpdateManyWithoutBuildingNestedInputSchema)
				.optional(),
		})
		.strict();

export const BuildingUncheckedUpdateInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			floors: z
				.lazy(
					() =>
						FloorUncheckedUpdateManyWithoutBuildingNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const BuildingCreateManyInputSchema: z.ZodType<Prisma.BuildingCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const BuildingUpdateManyMutationInputSchema: z.ZodType<Prisma.BuildingUpdateManyMutationInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const BuildingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateManyInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const FloorCreateInputSchema: z.ZodType<Prisma.FloorCreateInput> = z
	.object({
		id: z.string().optional(),
		number: z.number().int(),
		description: z.string().optional().nullable(),
		planFilename: z.string().optional().nullable(),
		maskFilename: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		building: z.lazy(() => BuildingCreateNestedOneWithoutFloorsInputSchema),
		rooms: z
			.lazy(() => RoomCreateNestedManyWithoutFloorInputSchema)
			.optional(),
	})
	.strict();

export const FloorUncheckedCreateInputSchema: z.ZodType<Prisma.FloorUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			number: z.number().int(),
			description: z.string().optional().nullable(),
			planFilename: z.string().optional().nullable(),
			maskFilename: z.string().optional().nullable(),
			buildingId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			rooms: z
				.lazy(
					() => RoomUncheckedCreateNestedManyWithoutFloorInputSchema
				)
				.optional(),
		})
		.strict();

export const FloorUpdateInputSchema: z.ZodType<Prisma.FloorUpdateInput> = z
	.object({
		number: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		description: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		planFilename: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		maskFilename: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		building: z
			.lazy(() => BuildingUpdateOneRequiredWithoutFloorsNestedInputSchema)
			.optional(),
		rooms: z
			.lazy(() => RoomUpdateManyWithoutFloorNestedInputSchema)
			.optional(),
	})
	.strict();

export const FloorUncheckedUpdateInputSchema: z.ZodType<Prisma.FloorUncheckedUpdateInput> =
	z
		.object({
			number: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			buildingId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(
					() => RoomUncheckedUpdateManyWithoutFloorNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const FloorCreateManyInputSchema: z.ZodType<Prisma.FloorCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			number: z.number().int(),
			description: z.string().optional().nullable(),
			planFilename: z.string().optional().nullable(),
			maskFilename: z.string().optional().nullable(),
			buildingId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const FloorUpdateManyMutationInputSchema: z.ZodType<Prisma.FloorUpdateManyMutationInput> =
	z
		.object({
			number: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const FloorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FloorUncheckedUpdateManyInput> =
	z
		.object({
			number: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			buildingId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomCreateInputSchema: z.ZodType<Prisma.RoomCreateInput> = z
	.object({
		id: z.string().optional(),
		name: z
			.string()
			.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		floor: z.lazy(() => FloorCreateNestedOneWithoutRoomsInputSchema),
		lessons: z
			.lazy(() => LessonCreateNestedManyWithoutRoomInputSchema)
			.optional(),
	})
	.strict();

export const RoomUncheckedCreateInputSchema: z.ZodType<Prisma.RoomUncheckedCreateInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			floorId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() => LessonUncheckedCreateNestedManyWithoutRoomInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomUpdateInputSchema: z.ZodType<Prisma.RoomUpdateInput> = z
	.object({
		name: z
			.union([
				z
					.string()
					.min(1, {
						message: "Името трябва да сърдържа поне 1 символ",
					}),
				z.lazy(() => StringFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		floor: z
			.lazy(() => FloorUpdateOneRequiredWithoutRoomsNestedInputSchema)
			.optional(),
		lessons: z
			.lazy(() => LessonUpdateManyWithoutRoomNestedInputSchema)
			.optional(),
	})
	.strict();

export const RoomUncheckedUpdateInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			floorId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() => LessonUncheckedUpdateManyWithoutRoomNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomCreateManyInputSchema: z.ZodType<Prisma.RoomCreateManyInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			floorId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const RoomUpdateManyMutationInputSchema: z.ZodType<Prisma.RoomUpdateManyMutationInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			floorId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
	.object({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringFilterSchema)])
			.optional(),
	})
	.strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> =
	z
		.object({
			equals: z.string().array().optional().nullable(),
			has: z.string().optional().nullable(),
			hasEvery: z.string().array().optional(),
			hasSome: z.string().array().optional(),
			isEmpty: z.boolean().optional(),
		})
		.strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
	.object({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
			.optional(),
	})
	.strict();

export const SchoolRelationFilterSchema: z.ZodType<Prisma.SchoolRelationFilter> =
	z
		.object({
			is: z.lazy(() => SchoolWhereInputSchema).optional(),
			isNot: z.lazy(() => SchoolWhereInputSchema).optional(),
		})
		.strict();

export const LessonListRelationFilterSchema: z.ZodType<Prisma.LessonListRelationFilter> =
	z
		.object({
			every: z.lazy(() => LessonWhereInputSchema).optional(),
			some: z.lazy(() => LessonWhereInputSchema).optional(),
			none: z.lazy(() => LessonWhereInputSchema).optional(),
		})
		.strict();

export const SubjectListRelationFilterSchema: z.ZodType<Prisma.SubjectListRelationFilter> =
	z
		.object({
			every: z.lazy(() => SubjectWhereInputSchema).optional(),
			some: z.lazy(() => SubjectWhereInputSchema).optional(),
			none: z.lazy(() => SubjectWhereInputSchema).optional(),
		})
		.strict();

export const LessonOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LessonOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SubjectOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubjectOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const TeacherCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			subjectIds: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const TeacherMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const TeacherMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional(),
			in: z.string().array().optional(),
			notIn: z.string().array().optional(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			mode: z.lazy(() => QueryModeSchema).optional(),
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedStringFilterSchema).optional(),
			_max: z.lazy(() => NestedStringFilterSchema).optional(),
		})
		.strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.coerce.date().array().optional(),
			notIn: z.coerce.date().array().optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([
					z.coerce.date(),
					z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		})
		.strict();

export const SchoolClassRelationFilterSchema: z.ZodType<Prisma.SchoolClassRelationFilter> =
	z
		.object({
			is: z.lazy(() => SchoolClassWhereInputSchema).optional(),
			isNot: z.lazy(() => SchoolClassWhereInputSchema).optional(),
		})
		.strict();

export const StudentCountOrderByAggregateInputSchema: z.ZodType<Prisma.StudentCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const StudentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const StudentMinOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const TeacherListRelationFilterSchema: z.ZodType<Prisma.TeacherListRelationFilter> =
	z
		.object({
			every: z.lazy(() => TeacherWhereInputSchema).optional(),
			some: z.lazy(() => TeacherWhereInputSchema).optional(),
			none: z.lazy(() => TeacherWhereInputSchema).optional(),
		})
		.strict();

export const TeacherOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TeacherOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SubjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubjectCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			teacherIds: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SubjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubjectMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SubjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubjectMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntFilterSchema)])
			.optional(),
	})
	.strict();

export const EnumLessonWeekFilterSchema: z.ZodType<Prisma.EnumLessonWeekFilter> =
	z
		.object({
			equals: z.lazy(() => LessonWeekSchema).optional(),
			in: z
				.lazy(() => LessonWeekSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => LessonWeekSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(() => NestedEnumLessonWeekFilterSchema),
				])
				.optional(),
		})
		.strict();

export const RoomRelationFilterSchema: z.ZodType<Prisma.RoomRelationFilter> = z
	.object({
		is: z.lazy(() => RoomWhereInputSchema).optional(),
		isNot: z.lazy(() => RoomWhereInputSchema).optional(),
	})
	.strict();

export const TeacherRelationFilterSchema: z.ZodType<Prisma.TeacherRelationFilter> =
	z
		.object({
			is: z.lazy(() => TeacherWhereInputSchema).optional(),
			isNot: z.lazy(() => TeacherWhereInputSchema).optional(),
		})
		.strict();

export const SubjectRelationFilterSchema: z.ZodType<Prisma.SubjectRelationFilter> =
	z
		.object({
			is: z.lazy(() => SubjectWhereInputSchema).optional(),
			isNot: z.lazy(() => SubjectWhereInputSchema).optional(),
		})
		.strict();

export const ScheduleRelationFilterSchema: z.ZodType<Prisma.ScheduleRelationFilter> =
	z
		.object({
			is: z.lazy(() => ScheduleWhereInputSchema).optional(),
			isNot: z.lazy(() => ScheduleWhereInputSchema).optional(),
		})
		.strict();

export const LessonLessonNumberLessonWeeksScheduleIdCompoundUniqueInputSchema: z.ZodType<Prisma.LessonLessonNumberLessonWeeksScheduleIdCompoundUniqueInput> =
	z
		.object({
			lessonNumber: z.number(),
			lessonWeeks: z.lazy(() => LessonWeekSchema),
			scheduleId: z.string(),
		})
		.strict();

export const LessonCountOrderByAggregateInputSchema: z.ZodType<Prisma.LessonCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			lessonNumber: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			lessonWeeks: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			teacherId: z.lazy(() => SortOrderSchema).optional(),
			subjectId: z.lazy(() => SortOrderSchema).optional(),
			scheduleId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const LessonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LessonAvgOrderByAggregateInput> =
	z
		.object({
			lessonNumber: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const LessonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LessonMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			lessonNumber: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			lessonWeeks: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			teacherId: z.lazy(() => SortOrderSchema).optional(),
			subjectId: z.lazy(() => SortOrderSchema).optional(),
			scheduleId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const LessonMinOrderByAggregateInputSchema: z.ZodType<Prisma.LessonMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			lessonNumber: z.lazy(() => SortOrderSchema).optional(),
			startTime: z.lazy(() => SortOrderSchema).optional(),
			endTime: z.lazy(() => SortOrderSchema).optional(),
			lessonWeeks: z.lazy(() => SortOrderSchema).optional(),
			roomId: z.lazy(() => SortOrderSchema).optional(),
			teacherId: z.lazy(() => SortOrderSchema).optional(),
			subjectId: z.lazy(() => SortOrderSchema).optional(),
			scheduleId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const LessonSumOrderByAggregateInputSchema: z.ZodType<Prisma.LessonSumOrderByAggregateInput> =
	z
		.object({
			lessonNumber: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional(),
			in: z.number().array().optional(),
			notIn: z.number().array().optional(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([
					z.number(),
					z.lazy(() => NestedIntWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
			_sum: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedIntFilterSchema).optional(),
			_max: z.lazy(() => NestedIntFilterSchema).optional(),
		})
		.strict();

export const EnumLessonWeekWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLessonWeekWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => LessonWeekSchema).optional(),
			in: z
				.lazy(() => LessonWeekSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => LessonWeekSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => NestedEnumLessonWeekWithAggregatesFilterSchema
					),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumLessonWeekFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumLessonWeekFilterSchema).optional(),
		})
		.strict();

export const EnumDayFilterSchema: z.ZodType<Prisma.EnumDayFilter> = z
	.object({
		equals: z.lazy(() => DaySchema).optional(),
		in: z
			.lazy(() => DaySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => DaySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => DaySchema),
				z.lazy(() => NestedEnumDayFilterSchema),
			])
			.optional(),
	})
	.strict();

export const ScheduleDayClassIdCompoundUniqueInputSchema: z.ZodType<Prisma.ScheduleDayClassIdCompoundUniqueInput> =
	z
		.object({
			day: z.lazy(() => DaySchema),
			classId: z.string(),
		})
		.strict();

export const ScheduleCountOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduleCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			day: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ScheduleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduleMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			day: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ScheduleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ScheduleMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			day: z.lazy(() => SortOrderSchema).optional(),
			classId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const EnumDayWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDayWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => DaySchema).optional(),
			in: z
				.lazy(() => DaySchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => DaySchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => NestedEnumDayWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumDayFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumDayFilterSchema).optional(),
		})
		.strict();

export const StudentListRelationFilterSchema: z.ZodType<Prisma.StudentListRelationFilter> =
	z
		.object({
			every: z.lazy(() => StudentWhereInputSchema).optional(),
			some: z.lazy(() => StudentWhereInputSchema).optional(),
			none: z.lazy(() => StudentWhereInputSchema).optional(),
		})
		.strict();

export const ScheduleListRelationFilterSchema: z.ZodType<Prisma.ScheduleListRelationFilter> =
	z
		.object({
			every: z.lazy(() => ScheduleWhereInputSchema).optional(),
			some: z.lazy(() => ScheduleWhereInputSchema).optional(),
			none: z.lazy(() => ScheduleWhereInputSchema).optional(),
		})
		.strict();

export const StudentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StudentOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const ScheduleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ScheduleOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SchoolClassSchoolIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.SchoolClassSchoolIdNameCompoundUniqueInput> =
	z
		.object({
			schoolId: z.string(),
			name: z.string(),
		})
		.strict();

export const SchoolClassCountOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolClassCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SchoolClassMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolClassMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SchoolClassMinOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolClassMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SchoolClassListRelationFilterSchema: z.ZodType<Prisma.SchoolClassListRelationFilter> =
	z
		.object({
			every: z.lazy(() => SchoolClassWhereInputSchema).optional(),
			some: z.lazy(() => SchoolClassWhereInputSchema).optional(),
			none: z.lazy(() => SchoolClassWhereInputSchema).optional(),
		})
		.strict();

export const BuildingListRelationFilterSchema: z.ZodType<Prisma.BuildingListRelationFilter> =
	z
		.object({
			every: z.lazy(() => BuildingWhereInputSchema).optional(),
			some: z.lazy(() => BuildingWhereInputSchema).optional(),
			none: z.lazy(() => BuildingWhereInputSchema).optional(),
		})
		.strict();

export const SchoolClassOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SchoolClassOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const BuildingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BuildingOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SchoolCountOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SchoolMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SchoolMinOrderByAggregateInputSchema: z.ZodType<Prisma.SchoolMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FloorListRelationFilterSchema: z.ZodType<Prisma.FloorListRelationFilter> =
	z
		.object({
			every: z.lazy(() => FloorWhereInputSchema).optional(),
			some: z.lazy(() => FloorWhereInputSchema).optional(),
			none: z.lazy(() => FloorWhereInputSchema).optional(),
		})
		.strict();

export const FloorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FloorOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const BuildingSchoolIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.BuildingSchoolIdNameCompoundUniqueInput> =
	z
		.object({
			schoolId: z.string(),
			name: z.string(),
		})
		.strict();

export const BuildingCountOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const BuildingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const BuildingMinOrderByAggregateInputSchema: z.ZodType<Prisma.BuildingMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			schoolId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
	z
		.object({
			equals: z.string().optional().nullable(),
			in: z.string().array().optional().nullable(),
			notIn: z.string().array().optional().nullable(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			mode: z.lazy(() => QueryModeSchema).optional(),
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringNullableFilterSchema),
				])
				.optional()
				.nullable(),
			isSet: z.boolean().optional(),
		})
		.strict();

export const BuildingRelationFilterSchema: z.ZodType<Prisma.BuildingRelationFilter> =
	z
		.object({
			is: z.lazy(() => BuildingWhereInputSchema).optional(),
			isNot: z.lazy(() => BuildingWhereInputSchema).optional(),
		})
		.strict();

export const RoomListRelationFilterSchema: z.ZodType<Prisma.RoomListRelationFilter> =
	z
		.object({
			every: z.lazy(() => RoomWhereInputSchema).optional(),
			some: z.lazy(() => RoomWhereInputSchema).optional(),
			none: z.lazy(() => RoomWhereInputSchema).optional(),
		})
		.strict();

export const RoomOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RoomOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FloorBuildingIdNumberCompoundUniqueInputSchema: z.ZodType<Prisma.FloorBuildingIdNumberCompoundUniqueInput> =
	z
		.object({
			buildingId: z.string(),
			number: z.number(),
		})
		.strict();

export const FloorCountOrderByAggregateInputSchema: z.ZodType<Prisma.FloorCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			number: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			planFilename: z.lazy(() => SortOrderSchema).optional(),
			maskFilename: z.lazy(() => SortOrderSchema).optional(),
			buildingId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FloorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FloorAvgOrderByAggregateInput> =
	z
		.object({
			number: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FloorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FloorMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			number: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			planFilename: z.lazy(() => SortOrderSchema).optional(),
			maskFilename: z.lazy(() => SortOrderSchema).optional(),
			buildingId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FloorMinOrderByAggregateInputSchema: z.ZodType<Prisma.FloorMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			number: z.lazy(() => SortOrderSchema).optional(),
			description: z.lazy(() => SortOrderSchema).optional(),
			planFilename: z.lazy(() => SortOrderSchema).optional(),
			maskFilename: z.lazy(() => SortOrderSchema).optional(),
			buildingId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const FloorSumOrderByAggregateInputSchema: z.ZodType<Prisma.FloorSumOrderByAggregateInput> =
	z
		.object({
			number: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional().nullable(),
			in: z.string().array().optional().nullable(),
			notIn: z.string().array().optional().nullable(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			mode: z.lazy(() => QueryModeSchema).optional(),
			not: z
				.union([
					z.string(),
					z.lazy(
						() => NestedStringNullableWithAggregatesFilterSchema
					),
				])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
			isSet: z.boolean().optional(),
		})
		.strict();

export const FloorRelationFilterSchema: z.ZodType<Prisma.FloorRelationFilter> =
	z
		.object({
			is: z.lazy(() => FloorWhereInputSchema).optional(),
			isNot: z.lazy(() => FloorWhereInputSchema).optional(),
		})
		.strict();

export const RoomFloorIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.RoomFloorIdNameCompoundUniqueInput> =
	z
		.object({
			floorId: z.string(),
			name: z.string(),
		})
		.strict();

export const RoomCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoomCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			floorId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const RoomMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			floorId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const RoomMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoomMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			floorId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			updatedAt: z.lazy(() => SortOrderSchema).optional(),
		})
		.strict();

export const SchoolCreateNestedOneWithoutTeachersInputSchema: z.ZodType<Prisma.SchoolCreateNestedOneWithoutTeachersInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolCreateWithoutTeachersInputSchema),
					z.lazy(
						() => SchoolUncheckedCreateWithoutTeachersInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SchoolCreateOrConnectWithoutTeachersInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
		})
		.strict();

export const LessonCreateNestedManyWithoutTeacherInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutTeacherInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutTeacherInputSchema),
					z.lazy(() => LessonCreateWithoutTeacherInputSchema).array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutTeacherInputSchema
					),
					z
						.lazy(
							() => LessonUncheckedCreateWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutTeacherInputSchema
					),
					z
						.lazy(
							() => LessonCreateOrConnectWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyTeacherInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectCreateNestedManyWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectCreateNestedManyWithoutTeachersInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
					z
						.lazy(() => SubjectCreateWithoutTeachersInputSchema)
						.array(),
					z.lazy(
						() => SubjectUncheckedCreateWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUncheckedCreateWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SubjectCreateOrConnectWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectCreateOrConnectWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherCreatesubjectIdsInputSchema: z.ZodType<Prisma.TeacherCreatesubjectIdsInput> =
	z
		.object({
			set: z.string().array(),
		})
		.strict();

export const LessonUncheckedCreateNestedManyWithoutTeacherInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutTeacherInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutTeacherInputSchema),
					z.lazy(() => LessonCreateWithoutTeacherInputSchema).array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutTeacherInputSchema
					),
					z
						.lazy(
							() => LessonUncheckedCreateWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutTeacherInputSchema
					),
					z
						.lazy(
							() => LessonCreateOrConnectWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyTeacherInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectUncheckedCreateNestedManyWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateNestedManyWithoutTeachersInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
					z
						.lazy(() => SubjectCreateWithoutTeachersInputSchema)
						.array(),
					z.lazy(
						() => SubjectUncheckedCreateWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUncheckedCreateWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SubjectCreateOrConnectWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectCreateOrConnectWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
	z
		.object({
			set: z.string().optional(),
		})
		.strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
	z
		.object({
			set: z.coerce.date().optional(),
		})
		.strict();

export const SchoolUpdateOneRequiredWithoutTeachersNestedInputSchema: z.ZodType<Prisma.SchoolUpdateOneRequiredWithoutTeachersNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolCreateWithoutTeachersInputSchema),
					z.lazy(
						() => SchoolUncheckedCreateWithoutTeachersInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SchoolCreateOrConnectWithoutTeachersInputSchema)
				.optional(),
			upsert: z
				.lazy(() => SchoolUpsertWithoutTeachersInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SchoolUpdateToOneWithWhereWithoutTeachersInputSchema
					),
					z.lazy(() => SchoolUpdateWithoutTeachersInputSchema),
					z.lazy(
						() => SchoolUncheckedUpdateWithoutTeachersInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const LessonUpdateManyWithoutTeacherNestedInputSchema: z.ZodType<Prisma.LessonUpdateManyWithoutTeacherNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutTeacherInputSchema),
					z.lazy(() => LessonCreateWithoutTeacherInputSchema).array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutTeacherInputSchema
					),
					z
						.lazy(
							() => LessonUncheckedCreateWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutTeacherInputSchema
					),
					z
						.lazy(
							() => LessonCreateOrConnectWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							LessonUpsertWithWhereUniqueWithoutTeacherInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpsertWithWhereUniqueWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyTeacherInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							LessonUpdateWithWhereUniqueWithoutTeacherInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateWithWhereUniqueWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => LessonUpdateManyWithWhereWithoutTeacherInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateManyWithWhereWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectUpdateManyWithoutTeachersNestedInputSchema: z.ZodType<Prisma.SubjectUpdateManyWithoutTeachersNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
					z
						.lazy(() => SubjectCreateWithoutTeachersInputSchema)
						.array(),
					z.lazy(
						() => SubjectUncheckedCreateWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUncheckedCreateWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SubjectCreateOrConnectWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectCreateOrConnectWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							SubjectUpdateManyWithWhereWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpdateManyWithWhereWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => SubjectScalarWhereInputSchema),
					z.lazy(() => SubjectScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherUpdatesubjectIdsInputSchema: z.ZodType<Prisma.TeacherUpdatesubjectIdsInput> =
	z
		.object({
			set: z.string().array().optional(),
			push: z.union([z.string(), z.string().array()]).optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyWithoutTeacherNestedInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutTeacherNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutTeacherInputSchema),
					z.lazy(() => LessonCreateWithoutTeacherInputSchema).array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutTeacherInputSchema
					),
					z
						.lazy(
							() => LessonUncheckedCreateWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutTeacherInputSchema
					),
					z
						.lazy(
							() => LessonCreateOrConnectWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							LessonUpsertWithWhereUniqueWithoutTeacherInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpsertWithWhereUniqueWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyTeacherInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							LessonUpdateWithWhereUniqueWithoutTeacherInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateWithWhereUniqueWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => LessonUpdateManyWithWhereWithoutTeacherInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateManyWithWhereWithoutTeacherInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectUncheckedUpdateManyWithoutTeachersNestedInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateManyWithoutTeachersNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
					z
						.lazy(() => SubjectCreateWithoutTeachersInputSchema)
						.array(),
					z.lazy(
						() => SubjectUncheckedCreateWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUncheckedCreateWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SubjectCreateOrConnectWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectCreateOrConnectWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							SubjectUpdateManyWithWhereWithoutTeachersInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpdateManyWithWhereWithoutTeachersInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => SubjectScalarWhereInputSchema),
					z.lazy(() => SubjectScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassCreateNestedOneWithoutStudentsInputSchema: z.ZodType<Prisma.SchoolClassCreateNestedOneWithoutStudentsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolClassCreateWithoutStudentsInputSchema),
					z.lazy(
						() =>
							SchoolClassUncheckedCreateWithoutStudentsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(
					() => SchoolClassCreateOrConnectWithoutStudentsInputSchema
				)
				.optional(),
			connect: z.lazy(() => SchoolClassWhereUniqueInputSchema).optional(),
		})
		.strict();

export const SchoolClassUpdateOneRequiredWithoutStudentsNestedInputSchema: z.ZodType<Prisma.SchoolClassUpdateOneRequiredWithoutStudentsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolClassCreateWithoutStudentsInputSchema),
					z.lazy(
						() =>
							SchoolClassUncheckedCreateWithoutStudentsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(
					() => SchoolClassCreateOrConnectWithoutStudentsInputSchema
				)
				.optional(),
			upsert: z
				.lazy(() => SchoolClassUpsertWithoutStudentsInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolClassWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SchoolClassUpdateToOneWithWhereWithoutStudentsInputSchema
					),
					z.lazy(() => SchoolClassUpdateWithoutStudentsInputSchema),
					z.lazy(
						() =>
							SchoolClassUncheckedUpdateWithoutStudentsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const SchoolCreateNestedOneWithoutSubjectsInputSchema: z.ZodType<Prisma.SchoolCreateNestedOneWithoutSubjectsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolCreateWithoutSubjectsInputSchema),
					z.lazy(
						() => SchoolUncheckedCreateWithoutSubjectsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SchoolCreateOrConnectWithoutSubjectsInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
		})
		.strict();

export const LessonCreateNestedManyWithoutSubjectInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutSubjectInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutSubjectInputSchema),
					z.lazy(() => LessonCreateWithoutSubjectInputSchema).array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutSubjectInputSchema
					),
					z
						.lazy(
							() => LessonUncheckedCreateWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutSubjectInputSchema
					),
					z
						.lazy(
							() => LessonCreateOrConnectWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManySubjectInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherCreateNestedManyWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateNestedManyWithoutSubjectsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
					z
						.lazy(() => TeacherCreateWithoutSubjectsInputSchema)
						.array(),
					z.lazy(
						() => TeacherUncheckedCreateWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUncheckedCreateWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => TeacherCreateOrConnectWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherCreateOrConnectWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectCreateteacherIdsInputSchema: z.ZodType<Prisma.SubjectCreateteacherIdsInput> =
	z
		.object({
			set: z.string().array(),
		})
		.strict();

export const LessonUncheckedCreateNestedManyWithoutSubjectInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutSubjectInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutSubjectInputSchema),
					z.lazy(() => LessonCreateWithoutSubjectInputSchema).array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutSubjectInputSchema
					),
					z
						.lazy(
							() => LessonUncheckedCreateWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutSubjectInputSchema
					),
					z
						.lazy(
							() => LessonCreateOrConnectWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManySubjectInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherUncheckedCreateNestedManyWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateNestedManyWithoutSubjectsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
					z
						.lazy(() => TeacherCreateWithoutSubjectsInputSchema)
						.array(),
					z.lazy(
						() => TeacherUncheckedCreateWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUncheckedCreateWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => TeacherCreateOrConnectWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherCreateOrConnectWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolUpdateOneRequiredWithoutSubjectsNestedInputSchema: z.ZodType<Prisma.SchoolUpdateOneRequiredWithoutSubjectsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolCreateWithoutSubjectsInputSchema),
					z.lazy(
						() => SchoolUncheckedCreateWithoutSubjectsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SchoolCreateOrConnectWithoutSubjectsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => SchoolUpsertWithoutSubjectsInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SchoolUpdateToOneWithWhereWithoutSubjectsInputSchema
					),
					z.lazy(() => SchoolUpdateWithoutSubjectsInputSchema),
					z.lazy(
						() => SchoolUncheckedUpdateWithoutSubjectsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const LessonUpdateManyWithoutSubjectNestedInputSchema: z.ZodType<Prisma.LessonUpdateManyWithoutSubjectNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutSubjectInputSchema),
					z.lazy(() => LessonCreateWithoutSubjectInputSchema).array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutSubjectInputSchema
					),
					z
						.lazy(
							() => LessonUncheckedCreateWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutSubjectInputSchema
					),
					z
						.lazy(
							() => LessonCreateOrConnectWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							LessonUpsertWithWhereUniqueWithoutSubjectInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpsertWithWhereUniqueWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManySubjectInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							LessonUpdateWithWhereUniqueWithoutSubjectInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateWithWhereUniqueWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => LessonUpdateManyWithWhereWithoutSubjectInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateManyWithWhereWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherUpdateManyWithoutSubjectsNestedInputSchema: z.ZodType<Prisma.TeacherUpdateManyWithoutSubjectsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
					z
						.lazy(() => TeacherCreateWithoutSubjectsInputSchema)
						.array(),
					z.lazy(
						() => TeacherUncheckedCreateWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUncheckedCreateWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => TeacherCreateOrConnectWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherCreateOrConnectWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							TeacherUpdateManyWithWhereWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpdateManyWithWhereWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TeacherScalarWhereInputSchema),
					z.lazy(() => TeacherScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectUpdateteacherIdsInputSchema: z.ZodType<Prisma.SubjectUpdateteacherIdsInput> =
	z
		.object({
			set: z.string().array().optional(),
			push: z.union([z.string(), z.string().array()]).optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyWithoutSubjectNestedInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutSubjectNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutSubjectInputSchema),
					z.lazy(() => LessonCreateWithoutSubjectInputSchema).array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutSubjectInputSchema
					),
					z
						.lazy(
							() => LessonUncheckedCreateWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutSubjectInputSchema
					),
					z
						.lazy(
							() => LessonCreateOrConnectWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							LessonUpsertWithWhereUniqueWithoutSubjectInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpsertWithWhereUniqueWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManySubjectInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							LessonUpdateWithWhereUniqueWithoutSubjectInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateWithWhereUniqueWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => LessonUpdateManyWithWhereWithoutSubjectInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateManyWithWhereWithoutSubjectInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherUncheckedUpdateManyWithoutSubjectsNestedInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateManyWithoutSubjectsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
					z
						.lazy(() => TeacherCreateWithoutSubjectsInputSchema)
						.array(),
					z.lazy(
						() => TeacherUncheckedCreateWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUncheckedCreateWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => TeacherCreateOrConnectWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherCreateOrConnectWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							TeacherUpdateManyWithWhereWithoutSubjectsInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpdateManyWithWhereWithoutSubjectsInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TeacherScalarWhereInputSchema),
					z.lazy(() => TeacherScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const RoomCreateNestedOneWithoutLessonsInputSchema: z.ZodType<Prisma.RoomCreateNestedOneWithoutLessonsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutLessonsInputSchema),
					z.lazy(() => RoomUncheckedCreateWithoutLessonsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => RoomCreateOrConnectWithoutLessonsInputSchema)
				.optional(),
			connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
		})
		.strict();

export const TeacherCreateNestedOneWithoutLessonsInputSchema: z.ZodType<Prisma.TeacherCreateNestedOneWithoutLessonsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutLessonsInputSchema),
					z.lazy(
						() => TeacherUncheckedCreateWithoutLessonsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => TeacherCreateOrConnectWithoutLessonsInputSchema)
				.optional(),
			connect: z.lazy(() => TeacherWhereUniqueInputSchema).optional(),
		})
		.strict();

export const SubjectCreateNestedOneWithoutLessonsInputSchema: z.ZodType<Prisma.SubjectCreateNestedOneWithoutLessonsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutLessonsInputSchema),
					z.lazy(
						() => SubjectUncheckedCreateWithoutLessonsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SubjectCreateOrConnectWithoutLessonsInputSchema)
				.optional(),
			connect: z.lazy(() => SubjectWhereUniqueInputSchema).optional(),
		})
		.strict();

export const ScheduleCreateNestedOneWithoutLessonsInputSchema: z.ZodType<Prisma.ScheduleCreateNestedOneWithoutLessonsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ScheduleCreateWithoutLessonsInputSchema),
					z.lazy(
						() => ScheduleUncheckedCreateWithoutLessonsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => ScheduleCreateOrConnectWithoutLessonsInputSchema)
				.optional(),
			connect: z.lazy(() => ScheduleWhereUniqueInputSchema).optional(),
		})
		.strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
	z
		.object({
			set: z.number().optional(),
			increment: z.number().optional(),
			decrement: z.number().optional(),
			multiply: z.number().optional(),
			divide: z.number().optional(),
		})
		.strict();

export const EnumLessonWeekFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLessonWeekFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => LessonWeekSchema).optional(),
		})
		.strict();

export const RoomUpdateOneRequiredWithoutLessonsNestedInputSchema: z.ZodType<Prisma.RoomUpdateOneRequiredWithoutLessonsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutLessonsInputSchema),
					z.lazy(() => RoomUncheckedCreateWithoutLessonsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => RoomCreateOrConnectWithoutLessonsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => RoomUpsertWithoutLessonsInputSchema)
				.optional(),
			connect: z.lazy(() => RoomWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => RoomUpdateToOneWithWhereWithoutLessonsInputSchema
					),
					z.lazy(() => RoomUpdateWithoutLessonsInputSchema),
					z.lazy(() => RoomUncheckedUpdateWithoutLessonsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TeacherUpdateOneRequiredWithoutLessonsNestedInputSchema: z.ZodType<Prisma.TeacherUpdateOneRequiredWithoutLessonsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutLessonsInputSchema),
					z.lazy(
						() => TeacherUncheckedCreateWithoutLessonsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => TeacherCreateOrConnectWithoutLessonsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => TeacherUpsertWithoutLessonsInputSchema)
				.optional(),
			connect: z.lazy(() => TeacherWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							TeacherUpdateToOneWithWhereWithoutLessonsInputSchema
					),
					z.lazy(() => TeacherUpdateWithoutLessonsInputSchema),
					z.lazy(
						() => TeacherUncheckedUpdateWithoutLessonsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const SubjectUpdateOneRequiredWithoutLessonsNestedInputSchema: z.ZodType<Prisma.SubjectUpdateOneRequiredWithoutLessonsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutLessonsInputSchema),
					z.lazy(
						() => SubjectUncheckedCreateWithoutLessonsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SubjectCreateOrConnectWithoutLessonsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => SubjectUpsertWithoutLessonsInputSchema)
				.optional(),
			connect: z.lazy(() => SubjectWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SubjectUpdateToOneWithWhereWithoutLessonsInputSchema
					),
					z.lazy(() => SubjectUpdateWithoutLessonsInputSchema),
					z.lazy(
						() => SubjectUncheckedUpdateWithoutLessonsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const ScheduleUpdateOneRequiredWithoutLessonsNestedInputSchema: z.ZodType<Prisma.ScheduleUpdateOneRequiredWithoutLessonsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ScheduleCreateWithoutLessonsInputSchema),
					z.lazy(
						() => ScheduleUncheckedCreateWithoutLessonsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => ScheduleCreateOrConnectWithoutLessonsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => ScheduleUpsertWithoutLessonsInputSchema)
				.optional(),
			connect: z.lazy(() => ScheduleWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ScheduleUpdateToOneWithWhereWithoutLessonsInputSchema
					),
					z.lazy(() => ScheduleUpdateWithoutLessonsInputSchema),
					z.lazy(
						() => ScheduleUncheckedUpdateWithoutLessonsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const SchoolClassCreateNestedOneWithoutWeeklyScheduleInputSchema: z.ZodType<Prisma.SchoolClassCreateNestedOneWithoutWeeklyScheduleInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(
						() => SchoolClassCreateWithoutWeeklyScheduleInputSchema
					),
					z.lazy(
						() =>
							SchoolClassUncheckedCreateWithoutWeeklyScheduleInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(
					() =>
						SchoolClassCreateOrConnectWithoutWeeklyScheduleInputSchema
				)
				.optional(),
			connect: z.lazy(() => SchoolClassWhereUniqueInputSchema).optional(),
		})
		.strict();

export const LessonCreateNestedManyWithoutScheduleInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutScheduleInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutScheduleInputSchema),
					z
						.lazy(() => LessonCreateWithoutScheduleInputSchema)
						.array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUncheckedCreateWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonCreateOrConnectWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyScheduleInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedCreateNestedManyWithoutScheduleInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutScheduleInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutScheduleInputSchema),
					z
						.lazy(() => LessonCreateWithoutScheduleInputSchema)
						.array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUncheckedCreateWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonCreateOrConnectWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyScheduleInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const EnumDayFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDayFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => DaySchema).optional(),
		})
		.strict();

export const SchoolClassUpdateOneRequiredWithoutWeeklyScheduleNestedInputSchema: z.ZodType<Prisma.SchoolClassUpdateOneRequiredWithoutWeeklyScheduleNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(
						() => SchoolClassCreateWithoutWeeklyScheduleInputSchema
					),
					z.lazy(
						() =>
							SchoolClassUncheckedCreateWithoutWeeklyScheduleInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(
					() =>
						SchoolClassCreateOrConnectWithoutWeeklyScheduleInputSchema
				)
				.optional(),
			upsert: z
				.lazy(() => SchoolClassUpsertWithoutWeeklyScheduleInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolClassWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SchoolClassUpdateToOneWithWhereWithoutWeeklyScheduleInputSchema
					),
					z.lazy(
						() => SchoolClassUpdateWithoutWeeklyScheduleInputSchema
					),
					z.lazy(
						() =>
							SchoolClassUncheckedUpdateWithoutWeeklyScheduleInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const LessonUpdateManyWithoutScheduleNestedInputSchema: z.ZodType<Prisma.LessonUpdateManyWithoutScheduleNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutScheduleInputSchema),
					z
						.lazy(() => LessonCreateWithoutScheduleInputSchema)
						.array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUncheckedCreateWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonCreateOrConnectWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							LessonUpsertWithWhereUniqueWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpsertWithWhereUniqueWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyScheduleInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							LessonUpdateWithWhereUniqueWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateWithWhereUniqueWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							LessonUpdateManyWithWhereWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateManyWithWhereWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyWithoutScheduleNestedInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutScheduleNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutScheduleInputSchema),
					z
						.lazy(() => LessonCreateWithoutScheduleInputSchema)
						.array(),
					z.lazy(
						() => LessonUncheckedCreateWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUncheckedCreateWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => LessonCreateOrConnectWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonCreateOrConnectWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							LessonUpsertWithWhereUniqueWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpsertWithWhereUniqueWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyScheduleInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							LessonUpdateWithWhereUniqueWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateWithWhereUniqueWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							LessonUpdateManyWithWhereWithoutScheduleInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateManyWithWhereWithoutScheduleInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolCreateNestedOneWithoutClassesInputSchema: z.ZodType<Prisma.SchoolCreateNestedOneWithoutClassesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolCreateWithoutClassesInputSchema),
					z.lazy(
						() => SchoolUncheckedCreateWithoutClassesInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SchoolCreateOrConnectWithoutClassesInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
		})
		.strict();

export const StudentCreateNestedManyWithoutClassInputSchema: z.ZodType<Prisma.StudentCreateNestedManyWithoutClassInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => StudentCreateWithoutClassInputSchema),
					z.lazy(() => StudentCreateWithoutClassInputSchema).array(),
					z.lazy(() => StudentUncheckedCreateWithoutClassInputSchema),
					z
						.lazy(
							() => StudentUncheckedCreateWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => StudentCreateOrConnectWithoutClassInputSchema),
					z
						.lazy(
							() => StudentCreateOrConnectWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => StudentCreateManyClassInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ScheduleCreateNestedManyWithoutClassInputSchema: z.ZodType<Prisma.ScheduleCreateNestedManyWithoutClassInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ScheduleCreateWithoutClassInputSchema),
					z.lazy(() => ScheduleCreateWithoutClassInputSchema).array(),
					z.lazy(
						() => ScheduleUncheckedCreateWithoutClassInputSchema
					),
					z
						.lazy(
							() => ScheduleUncheckedCreateWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ScheduleCreateOrConnectWithoutClassInputSchema
					),
					z
						.lazy(
							() => ScheduleCreateOrConnectWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ScheduleCreateManyClassInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const StudentUncheckedCreateNestedManyWithoutClassInputSchema: z.ZodType<Prisma.StudentUncheckedCreateNestedManyWithoutClassInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => StudentCreateWithoutClassInputSchema),
					z.lazy(() => StudentCreateWithoutClassInputSchema).array(),
					z.lazy(() => StudentUncheckedCreateWithoutClassInputSchema),
					z
						.lazy(
							() => StudentUncheckedCreateWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => StudentCreateOrConnectWithoutClassInputSchema),
					z
						.lazy(
							() => StudentCreateOrConnectWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => StudentCreateManyClassInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ScheduleUncheckedCreateNestedManyWithoutClassInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateNestedManyWithoutClassInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ScheduleCreateWithoutClassInputSchema),
					z.lazy(() => ScheduleCreateWithoutClassInputSchema).array(),
					z.lazy(
						() => ScheduleUncheckedCreateWithoutClassInputSchema
					),
					z
						.lazy(
							() => ScheduleUncheckedCreateWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ScheduleCreateOrConnectWithoutClassInputSchema
					),
					z
						.lazy(
							() => ScheduleCreateOrConnectWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ScheduleCreateManyClassInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolUpdateOneRequiredWithoutClassesNestedInputSchema: z.ZodType<Prisma.SchoolUpdateOneRequiredWithoutClassesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolCreateWithoutClassesInputSchema),
					z.lazy(
						() => SchoolUncheckedCreateWithoutClassesInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SchoolCreateOrConnectWithoutClassesInputSchema)
				.optional(),
			upsert: z
				.lazy(() => SchoolUpsertWithoutClassesInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SchoolUpdateToOneWithWhereWithoutClassesInputSchema
					),
					z.lazy(() => SchoolUpdateWithoutClassesInputSchema),
					z.lazy(
						() => SchoolUncheckedUpdateWithoutClassesInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const StudentUpdateManyWithoutClassNestedInputSchema: z.ZodType<Prisma.StudentUpdateManyWithoutClassNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => StudentCreateWithoutClassInputSchema),
					z.lazy(() => StudentCreateWithoutClassInputSchema).array(),
					z.lazy(() => StudentUncheckedCreateWithoutClassInputSchema),
					z
						.lazy(
							() => StudentUncheckedCreateWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => StudentCreateOrConnectWithoutClassInputSchema),
					z
						.lazy(
							() => StudentCreateOrConnectWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							StudentUpsertWithWhereUniqueWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								StudentUpsertWithWhereUniqueWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => StudentCreateManyClassInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							StudentUpdateWithWhereUniqueWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								StudentUpdateWithWhereUniqueWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => StudentUpdateManyWithWhereWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								StudentUpdateManyWithWhereWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => StudentScalarWhereInputSchema),
					z.lazy(() => StudentScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ScheduleUpdateManyWithoutClassNestedInputSchema: z.ZodType<Prisma.ScheduleUpdateManyWithoutClassNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ScheduleCreateWithoutClassInputSchema),
					z.lazy(() => ScheduleCreateWithoutClassInputSchema).array(),
					z.lazy(
						() => ScheduleUncheckedCreateWithoutClassInputSchema
					),
					z
						.lazy(
							() => ScheduleUncheckedCreateWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ScheduleCreateOrConnectWithoutClassInputSchema
					),
					z
						.lazy(
							() => ScheduleCreateOrConnectWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ScheduleUpsertWithWhereUniqueWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								ScheduleUpsertWithWhereUniqueWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ScheduleCreateManyClassInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ScheduleUpdateWithWhereUniqueWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								ScheduleUpdateWithWhereUniqueWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => ScheduleUpdateManyWithWhereWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								ScheduleUpdateManyWithWhereWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ScheduleScalarWhereInputSchema),
					z.lazy(() => ScheduleScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const StudentUncheckedUpdateManyWithoutClassNestedInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyWithoutClassNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => StudentCreateWithoutClassInputSchema),
					z.lazy(() => StudentCreateWithoutClassInputSchema).array(),
					z.lazy(() => StudentUncheckedCreateWithoutClassInputSchema),
					z
						.lazy(
							() => StudentUncheckedCreateWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => StudentCreateOrConnectWithoutClassInputSchema),
					z
						.lazy(
							() => StudentCreateOrConnectWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							StudentUpsertWithWhereUniqueWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								StudentUpsertWithWhereUniqueWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => StudentCreateManyClassInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => StudentWhereUniqueInputSchema),
					z.lazy(() => StudentWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							StudentUpdateWithWhereUniqueWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								StudentUpdateWithWhereUniqueWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => StudentUpdateManyWithWhereWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								StudentUpdateManyWithWhereWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => StudentScalarWhereInputSchema),
					z.lazy(() => StudentScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const ScheduleUncheckedUpdateManyWithoutClassNestedInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyWithoutClassNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ScheduleCreateWithoutClassInputSchema),
					z.lazy(() => ScheduleCreateWithoutClassInputSchema).array(),
					z.lazy(
						() => ScheduleUncheckedCreateWithoutClassInputSchema
					),
					z
						.lazy(
							() => ScheduleUncheckedCreateWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => ScheduleCreateOrConnectWithoutClassInputSchema
					),
					z
						.lazy(
							() => ScheduleCreateOrConnectWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							ScheduleUpsertWithWhereUniqueWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								ScheduleUpsertWithWhereUniqueWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ScheduleCreateManyClassInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ScheduleWhereUniqueInputSchema),
					z.lazy(() => ScheduleWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							ScheduleUpdateWithWhereUniqueWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								ScheduleUpdateWithWhereUniqueWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => ScheduleUpdateManyWithWhereWithoutClassInputSchema
					),
					z
						.lazy(
							() =>
								ScheduleUpdateManyWithWhereWithoutClassInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ScheduleScalarWhereInputSchema),
					z.lazy(() => ScheduleScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassCreateNestedManyWithoutSchoolInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolClassCreateWithoutSchoolInputSchema),
					z
						.lazy(() => SchoolClassCreateWithoutSchoolInputSchema)
						.array(),
					z.lazy(
						() => SchoolClassUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SchoolClassCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => SchoolClassCreateManySchoolInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectCreateNestedManyWithoutSchoolInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutSchoolInputSchema),
					z.lazy(() => SubjectCreateWithoutSchoolInputSchema).array(),
					z.lazy(
						() => SubjectUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => SubjectUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SubjectCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => SubjectCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => SubjectCreateManySchoolInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherCreateNestedManyWithoutSchoolInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutSchoolInputSchema),
					z.lazy(() => TeacherCreateWithoutSchoolInputSchema).array(),
					z.lazy(
						() => TeacherUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => TeacherUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => TeacherCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => TeacherCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => TeacherCreateManySchoolInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const BuildingCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingCreateNestedManyWithoutSchoolInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => BuildingCreateWithoutSchoolInputSchema),
					z
						.lazy(() => BuildingCreateWithoutSchoolInputSchema)
						.array(),
					z.lazy(
						() => BuildingUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => BuildingCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => BuildingCreateManySchoolInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassUncheckedCreateNestedManyWithoutSchoolInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolClassCreateWithoutSchoolInputSchema),
					z
						.lazy(() => SchoolClassCreateWithoutSchoolInputSchema)
						.array(),
					z.lazy(
						() => SchoolClassUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SchoolClassCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => SchoolClassCreateManySchoolInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectUncheckedCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateNestedManyWithoutSchoolInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutSchoolInputSchema),
					z.lazy(() => SubjectCreateWithoutSchoolInputSchema).array(),
					z.lazy(
						() => SubjectUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => SubjectUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SubjectCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => SubjectCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => SubjectCreateManySchoolInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherUncheckedCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateNestedManyWithoutSchoolInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutSchoolInputSchema),
					z.lazy(() => TeacherCreateWithoutSchoolInputSchema).array(),
					z.lazy(
						() => TeacherUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => TeacherUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => TeacherCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => TeacherCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => TeacherCreateManySchoolInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const BuildingUncheckedCreateNestedManyWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingUncheckedCreateNestedManyWithoutSchoolInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => BuildingCreateWithoutSchoolInputSchema),
					z
						.lazy(() => BuildingCreateWithoutSchoolInputSchema)
						.array(),
					z.lazy(
						() => BuildingUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => BuildingCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => BuildingCreateManySchoolInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.SchoolClassUpdateManyWithoutSchoolNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolClassCreateWithoutSchoolInputSchema),
					z
						.lazy(() => SchoolClassCreateWithoutSchoolInputSchema)
						.array(),
					z.lazy(
						() => SchoolClassUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SchoolClassCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							SchoolClassUpsertWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUpsertWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => SchoolClassCreateManySchoolInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SchoolClassUpdateWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUpdateWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							SchoolClassUpdateManyWithWhereWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUpdateManyWithWhereWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => SchoolClassScalarWhereInputSchema),
					z.lazy(() => SchoolClassScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.SubjectUpdateManyWithoutSchoolNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutSchoolInputSchema),
					z.lazy(() => SubjectCreateWithoutSchoolInputSchema).array(),
					z.lazy(
						() => SubjectUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => SubjectUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SubjectCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => SubjectCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							SubjectUpsertWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpsertWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => SubjectCreateManySchoolInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SubjectUpdateWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpdateWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => SubjectUpdateManyWithWhereWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpdateManyWithWhereWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => SubjectScalarWhereInputSchema),
					z.lazy(() => SubjectScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.TeacherUpdateManyWithoutSchoolNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutSchoolInputSchema),
					z.lazy(() => TeacherCreateWithoutSchoolInputSchema).array(),
					z.lazy(
						() => TeacherUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => TeacherUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => TeacherCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => TeacherCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							TeacherUpsertWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpsertWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => TeacherCreateManySchoolInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							TeacherUpdateWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpdateWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => TeacherUpdateManyWithWhereWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpdateManyWithWhereWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TeacherScalarWhereInputSchema),
					z.lazy(() => TeacherScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const BuildingUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.BuildingUpdateManyWithoutSchoolNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => BuildingCreateWithoutSchoolInputSchema),
					z
						.lazy(() => BuildingCreateWithoutSchoolInputSchema)
						.array(),
					z.lazy(
						() => BuildingUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => BuildingCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							BuildingUpsertWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUpsertWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => BuildingCreateManySchoolInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							BuildingUpdateWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUpdateWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							BuildingUpdateManyWithWhereWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUpdateManyWithWhereWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => BuildingScalarWhereInputSchema),
					z.lazy(() => BuildingScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.SchoolClassUncheckedUpdateManyWithoutSchoolNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolClassCreateWithoutSchoolInputSchema),
					z
						.lazy(() => SchoolClassCreateWithoutSchoolInputSchema)
						.array(),
					z.lazy(
						() => SchoolClassUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SchoolClassCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							SchoolClassUpsertWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUpsertWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => SchoolClassCreateManySchoolInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SchoolClassWhereUniqueInputSchema),
					z.lazy(() => SchoolClassWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SchoolClassUpdateWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUpdateWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							SchoolClassUpdateManyWithWhereWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SchoolClassUpdateManyWithWhereWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => SchoolClassScalarWhereInputSchema),
					z.lazy(() => SchoolClassScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SubjectUncheckedUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateManyWithoutSchoolNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SubjectCreateWithoutSchoolInputSchema),
					z.lazy(() => SubjectCreateWithoutSchoolInputSchema).array(),
					z.lazy(
						() => SubjectUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => SubjectUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => SubjectCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => SubjectCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							SubjectUpsertWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpsertWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => SubjectCreateManySchoolInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SubjectWhereUniqueInputSchema),
					z.lazy(() => SubjectWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SubjectUpdateWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpdateWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => SubjectUpdateManyWithWhereWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								SubjectUpdateManyWithWhereWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => SubjectScalarWhereInputSchema),
					z.lazy(() => SubjectScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const TeacherUncheckedUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateManyWithoutSchoolNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TeacherCreateWithoutSchoolInputSchema),
					z.lazy(() => TeacherCreateWithoutSchoolInputSchema).array(),
					z.lazy(
						() => TeacherUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => TeacherUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => TeacherCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() => TeacherCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							TeacherUpsertWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpsertWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => TeacherCreateManySchoolInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TeacherWhereUniqueInputSchema),
					z.lazy(() => TeacherWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							TeacherUpdateWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpdateWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => TeacherUpdateManyWithWhereWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								TeacherUpdateManyWithWhereWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TeacherScalarWhereInputSchema),
					z.lazy(() => TeacherScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const BuildingUncheckedUpdateManyWithoutSchoolNestedInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateManyWithoutSchoolNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => BuildingCreateWithoutSchoolInputSchema),
					z
						.lazy(() => BuildingCreateWithoutSchoolInputSchema)
						.array(),
					z.lazy(
						() => BuildingUncheckedCreateWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUncheckedCreateWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => BuildingCreateOrConnectWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingCreateOrConnectWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							BuildingUpsertWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUpsertWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => BuildingCreateManySchoolInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => BuildingWhereUniqueInputSchema),
					z.lazy(() => BuildingWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							BuildingUpdateWithWhereUniqueWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUpdateWithWhereUniqueWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() =>
							BuildingUpdateManyWithWhereWithoutSchoolInputSchema
					),
					z
						.lazy(
							() =>
								BuildingUpdateManyWithWhereWithoutSchoolInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => BuildingScalarWhereInputSchema),
					z.lazy(() => BuildingScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolCreateNestedOneWithoutBuildingsInputSchema: z.ZodType<Prisma.SchoolCreateNestedOneWithoutBuildingsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolCreateWithoutBuildingsInputSchema),
					z.lazy(
						() => SchoolUncheckedCreateWithoutBuildingsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SchoolCreateOrConnectWithoutBuildingsInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
		})
		.strict();

export const FloorCreateNestedManyWithoutBuildingInputSchema: z.ZodType<Prisma.FloorCreateNestedManyWithoutBuildingInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FloorCreateWithoutBuildingInputSchema),
					z.lazy(() => FloorCreateWithoutBuildingInputSchema).array(),
					z.lazy(
						() => FloorUncheckedCreateWithoutBuildingInputSchema
					),
					z
						.lazy(
							() => FloorUncheckedCreateWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => FloorCreateOrConnectWithoutBuildingInputSchema
					),
					z
						.lazy(
							() => FloorCreateOrConnectWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => FloorCreateManyBuildingInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const FloorUncheckedCreateNestedManyWithoutBuildingInputSchema: z.ZodType<Prisma.FloorUncheckedCreateNestedManyWithoutBuildingInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FloorCreateWithoutBuildingInputSchema),
					z.lazy(() => FloorCreateWithoutBuildingInputSchema).array(),
					z.lazy(
						() => FloorUncheckedCreateWithoutBuildingInputSchema
					),
					z
						.lazy(
							() => FloorUncheckedCreateWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => FloorCreateOrConnectWithoutBuildingInputSchema
					),
					z
						.lazy(
							() => FloorCreateOrConnectWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => FloorCreateManyBuildingInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const SchoolUpdateOneRequiredWithoutBuildingsNestedInputSchema: z.ZodType<Prisma.SchoolUpdateOneRequiredWithoutBuildingsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SchoolCreateWithoutBuildingsInputSchema),
					z.lazy(
						() => SchoolUncheckedCreateWithoutBuildingsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => SchoolCreateOrConnectWithoutBuildingsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => SchoolUpsertWithoutBuildingsInputSchema)
				.optional(),
			connect: z.lazy(() => SchoolWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							SchoolUpdateToOneWithWhereWithoutBuildingsInputSchema
					),
					z.lazy(() => SchoolUpdateWithoutBuildingsInputSchema),
					z.lazy(
						() => SchoolUncheckedUpdateWithoutBuildingsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const FloorUpdateManyWithoutBuildingNestedInputSchema: z.ZodType<Prisma.FloorUpdateManyWithoutBuildingNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FloorCreateWithoutBuildingInputSchema),
					z.lazy(() => FloorCreateWithoutBuildingInputSchema).array(),
					z.lazy(
						() => FloorUncheckedCreateWithoutBuildingInputSchema
					),
					z
						.lazy(
							() => FloorUncheckedCreateWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => FloorCreateOrConnectWithoutBuildingInputSchema
					),
					z
						.lazy(
							() => FloorCreateOrConnectWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							FloorUpsertWithWhereUniqueWithoutBuildingInputSchema
					),
					z
						.lazy(
							() =>
								FloorUpsertWithWhereUniqueWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => FloorCreateManyBuildingInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							FloorUpdateWithWhereUniqueWithoutBuildingInputSchema
					),
					z
						.lazy(
							() =>
								FloorUpdateWithWhereUniqueWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => FloorUpdateManyWithWhereWithoutBuildingInputSchema
					),
					z
						.lazy(
							() =>
								FloorUpdateManyWithWhereWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => FloorScalarWhereInputSchema),
					z.lazy(() => FloorScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const FloorUncheckedUpdateManyWithoutBuildingNestedInputSchema: z.ZodType<Prisma.FloorUncheckedUpdateManyWithoutBuildingNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FloorCreateWithoutBuildingInputSchema),
					z.lazy(() => FloorCreateWithoutBuildingInputSchema).array(),
					z.lazy(
						() => FloorUncheckedCreateWithoutBuildingInputSchema
					),
					z
						.lazy(
							() => FloorUncheckedCreateWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(
						() => FloorCreateOrConnectWithoutBuildingInputSchema
					),
					z
						.lazy(
							() => FloorCreateOrConnectWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() =>
							FloorUpsertWithWhereUniqueWithoutBuildingInputSchema
					),
					z
						.lazy(
							() =>
								FloorUpsertWithWhereUniqueWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => FloorCreateManyBuildingInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => FloorWhereUniqueInputSchema),
					z.lazy(() => FloorWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() =>
							FloorUpdateWithWhereUniqueWithoutBuildingInputSchema
					),
					z
						.lazy(
							() =>
								FloorUpdateWithWhereUniqueWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => FloorUpdateManyWithWhereWithoutBuildingInputSchema
					),
					z
						.lazy(
							() =>
								FloorUpdateManyWithWhereWithoutBuildingInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => FloorScalarWhereInputSchema),
					z.lazy(() => FloorScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const BuildingCreateNestedOneWithoutFloorsInputSchema: z.ZodType<Prisma.BuildingCreateNestedOneWithoutFloorsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => BuildingCreateWithoutFloorsInputSchema),
					z.lazy(
						() => BuildingUncheckedCreateWithoutFloorsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => BuildingCreateOrConnectWithoutFloorsInputSchema)
				.optional(),
			connect: z.lazy(() => BuildingWhereUniqueInputSchema).optional(),
		})
		.strict();

export const RoomCreateNestedManyWithoutFloorInputSchema: z.ZodType<Prisma.RoomCreateNestedManyWithoutFloorInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutFloorInputSchema),
					z.lazy(() => RoomCreateWithoutFloorInputSchema).array(),
					z.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema),
					z
						.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => RoomCreateOrConnectWithoutFloorInputSchema),
					z
						.lazy(() => RoomCreateOrConnectWithoutFloorInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => RoomCreateManyFloorInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const RoomUncheckedCreateNestedManyWithoutFloorInputSchema: z.ZodType<Prisma.RoomUncheckedCreateNestedManyWithoutFloorInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutFloorInputSchema),
					z.lazy(() => RoomCreateWithoutFloorInputSchema).array(),
					z.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema),
					z
						.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => RoomCreateOrConnectWithoutFloorInputSchema),
					z
						.lazy(() => RoomCreateOrConnectWithoutFloorInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => RoomCreateManyFloorInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
	z
		.object({
			set: z.string().optional().nullable(),
			unset: z.boolean().optional(),
		})
		.strict();

export const BuildingUpdateOneRequiredWithoutFloorsNestedInputSchema: z.ZodType<Prisma.BuildingUpdateOneRequiredWithoutFloorsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => BuildingCreateWithoutFloorsInputSchema),
					z.lazy(
						() => BuildingUncheckedCreateWithoutFloorsInputSchema
					),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => BuildingCreateOrConnectWithoutFloorsInputSchema)
				.optional(),
			upsert: z
				.lazy(() => BuildingUpsertWithoutFloorsInputSchema)
				.optional(),
			connect: z.lazy(() => BuildingWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() =>
							BuildingUpdateToOneWithWhereWithoutFloorsInputSchema
					),
					z.lazy(() => BuildingUpdateWithoutFloorsInputSchema),
					z.lazy(
						() => BuildingUncheckedUpdateWithoutFloorsInputSchema
					),
				])
				.optional(),
		})
		.strict();

export const RoomUpdateManyWithoutFloorNestedInputSchema: z.ZodType<Prisma.RoomUpdateManyWithoutFloorNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutFloorInputSchema),
					z.lazy(() => RoomCreateWithoutFloorInputSchema).array(),
					z.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema),
					z
						.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => RoomCreateOrConnectWithoutFloorInputSchema),
					z
						.lazy(() => RoomCreateOrConnectWithoutFloorInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => RoomUpsertWithWhereUniqueWithoutFloorInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpsertWithWhereUniqueWithoutFloorInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => RoomCreateManyFloorInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => RoomUpdateWithWhereUniqueWithoutFloorInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpdateWithWhereUniqueWithoutFloorInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => RoomUpdateManyWithWhereWithoutFloorInputSchema
					),
					z
						.lazy(
							() => RoomUpdateManyWithWhereWithoutFloorInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateManyWithoutFloorNestedInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutFloorNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => RoomCreateWithoutFloorInputSchema),
					z.lazy(() => RoomCreateWithoutFloorInputSchema).array(),
					z.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema),
					z
						.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => RoomCreateOrConnectWithoutFloorInputSchema),
					z
						.lazy(() => RoomCreateOrConnectWithoutFloorInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => RoomUpsertWithWhereUniqueWithoutFloorInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpsertWithWhereUniqueWithoutFloorInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => RoomCreateManyFloorInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => RoomWhereUniqueInputSchema),
					z.lazy(() => RoomWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => RoomUpdateWithWhereUniqueWithoutFloorInputSchema
					),
					z
						.lazy(
							() =>
								RoomUpdateWithWhereUniqueWithoutFloorInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => RoomUpdateManyWithWhereWithoutFloorInputSchema
					),
					z
						.lazy(
							() => RoomUpdateManyWithWhereWithoutFloorInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const FloorCreateNestedOneWithoutRoomsInputSchema: z.ZodType<Prisma.FloorCreateNestedOneWithoutRoomsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FloorCreateWithoutRoomsInputSchema),
					z.lazy(() => FloorUncheckedCreateWithoutRoomsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => FloorCreateOrConnectWithoutRoomsInputSchema)
				.optional(),
			connect: z.lazy(() => FloorWhereUniqueInputSchema).optional(),
		})
		.strict();

export const LessonCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.LessonCreateNestedManyWithoutRoomInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutRoomInputSchema),
					z.lazy(() => LessonCreateWithoutRoomInputSchema).array(),
					z.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema),
					z
						.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => LessonCreateOrConnectWithoutRoomInputSchema),
					z
						.lazy(() => LessonCreateOrConnectWithoutRoomInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyRoomInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.LessonUncheckedCreateNestedManyWithoutRoomInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutRoomInputSchema),
					z.lazy(() => LessonCreateWithoutRoomInputSchema).array(),
					z.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema),
					z
						.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => LessonCreateOrConnectWithoutRoomInputSchema),
					z
						.lazy(() => LessonCreateOrConnectWithoutRoomInputSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyRoomInputEnvelopeSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const FloorUpdateOneRequiredWithoutRoomsNestedInputSchema: z.ZodType<Prisma.FloorUpdateOneRequiredWithoutRoomsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => FloorCreateWithoutRoomsInputSchema),
					z.lazy(() => FloorUncheckedCreateWithoutRoomsInputSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => FloorCreateOrConnectWithoutRoomsInputSchema)
				.optional(),
			upsert: z.lazy(() => FloorUpsertWithoutRoomsInputSchema).optional(),
			connect: z.lazy(() => FloorWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => FloorUpdateToOneWithWhereWithoutRoomsInputSchema
					),
					z.lazy(() => FloorUpdateWithoutRoomsInputSchema),
					z.lazy(() => FloorUncheckedUpdateWithoutRoomsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.LessonUpdateManyWithoutRoomNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutRoomInputSchema),
					z.lazy(() => LessonCreateWithoutRoomInputSchema).array(),
					z.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema),
					z
						.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => LessonCreateOrConnectWithoutRoomInputSchema),
					z
						.lazy(() => LessonCreateOrConnectWithoutRoomInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => LessonUpsertWithWhereUniqueWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpsertWithWhereUniqueWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyRoomInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => LessonUpdateWithWhereUniqueWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateWithWhereUniqueWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => LessonUpdateManyWithWhereWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateManyWithWhereWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutRoomNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => LessonCreateWithoutRoomInputSchema),
					z.lazy(() => LessonCreateWithoutRoomInputSchema).array(),
					z.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema),
					z
						.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => LessonCreateOrConnectWithoutRoomInputSchema),
					z
						.lazy(() => LessonCreateOrConnectWithoutRoomInputSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => LessonUpsertWithWhereUniqueWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpsertWithWhereUniqueWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => LessonCreateManyRoomInputEnvelopeSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => LessonWhereUniqueInputSchema),
					z.lazy(() => LessonWhereUniqueInputSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => LessonUpdateWithWhereUniqueWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateWithWhereUniqueWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => LessonUpdateManyWithWhereWithoutRoomInputSchema
					),
					z
						.lazy(
							() =>
								LessonUpdateManyWithWhereWithoutRoomInputSchema
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
		})
		.strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
	.object({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringFilterSchema)])
			.optional(),
	})
	.strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.coerce.date().array().optional(),
			notIn: z.coerce.date().array().optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([
					z.coerce.date(),
					z.lazy(() => NestedDateTimeFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional(),
			in: z.string().array().optional(),
			notIn: z.string().array().optional(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedStringFilterSchema).optional(),
			_max: z.lazy(() => NestedStringFilterSchema).optional(),
		})
		.strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntFilterSchema)])
			.optional(),
	})
	.strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.coerce.date().array().optional(),
			notIn: z.coerce.date().array().optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([
					z.coerce.date(),
					z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		})
		.strict();

export const NestedEnumLessonWeekFilterSchema: z.ZodType<Prisma.NestedEnumLessonWeekFilter> =
	z
		.object({
			equals: z.lazy(() => LessonWeekSchema).optional(),
			in: z
				.lazy(() => LessonWeekSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => LessonWeekSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(() => NestedEnumLessonWeekFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional(),
			in: z.number().array().optional(),
			notIn: z.number().array().optional(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([
					z.number(),
					z.lazy(() => NestedIntWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
			_sum: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedIntFilterSchema).optional(),
			_max: z.lazy(() => NestedIntFilterSchema).optional(),
		})
		.strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
			.optional(),
	})
	.strict();

export const NestedEnumLessonWeekWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLessonWeekWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => LessonWeekSchema).optional(),
			in: z
				.lazy(() => LessonWeekSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => LessonWeekSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => NestedEnumLessonWeekWithAggregatesFilterSchema
					),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumLessonWeekFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumLessonWeekFilterSchema).optional(),
		})
		.strict();

export const NestedEnumDayFilterSchema: z.ZodType<Prisma.NestedEnumDayFilter> =
	z
		.object({
			equals: z.lazy(() => DaySchema).optional(),
			in: z
				.lazy(() => DaySchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => DaySchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => NestedEnumDayFilterSchema),
				])
				.optional(),
		})
		.strict();

export const NestedEnumDayWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDayWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => DaySchema).optional(),
			in: z
				.lazy(() => DaySchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => DaySchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => NestedEnumDayWithAggregatesFilterSchema),
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumDayFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumDayFilterSchema).optional(),
		})
		.strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
	z
		.object({
			equals: z.string().optional().nullable(),
			in: z.string().array().optional().nullable(),
			notIn: z.string().array().optional().nullable(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			not: z
				.union([
					z.string(),
					z.lazy(() => NestedStringNullableFilterSchema),
				])
				.optional()
				.nullable(),
			isSet: z.boolean().optional(),
		})
		.strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional().nullable(),
			in: z.string().array().optional().nullable(),
			notIn: z.string().array().optional().nullable(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			not: z
				.union([
					z.string(),
					z.lazy(
						() => NestedStringNullableWithAggregatesFilterSchema
					),
				])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
			isSet: z.boolean().optional(),
		})
		.strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
	z
		.object({
			equals: z.number().optional().nullable(),
			in: z.number().array().optional().nullable(),
			notIn: z.number().array().optional().nullable(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([
					z.number(),
					z.lazy(() => NestedIntNullableFilterSchema),
				])
				.optional()
				.nullable(),
			isSet: z.boolean().optional(),
		})
		.strict();

export const SchoolCreateWithoutTeachersInputSchema: z.ZodType<Prisma.SchoolCreateWithoutTeachersInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classes: z
				.lazy(() => SchoolClassCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
			subjects: z
				.lazy(() => SubjectCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
			buildings: z
				.lazy(() => BuildingCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
		})
		.strict();

export const SchoolUncheckedCreateWithoutTeachersInputSchema: z.ZodType<Prisma.SchoolUncheckedCreateWithoutTeachersInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classes: z
				.lazy(
					() =>
						SchoolClassUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			buildings: z
				.lazy(
					() =>
						BuildingUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolCreateOrConnectWithoutTeachersInputSchema: z.ZodType<Prisma.SchoolCreateOrConnectWithoutTeachersInput> =
	z
		.object({
			where: z.lazy(() => SchoolWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SchoolCreateWithoutTeachersInputSchema),
				z.lazy(() => SchoolUncheckedCreateWithoutTeachersInputSchema),
			]),
		})
		.strict();

export const LessonCreateWithoutTeacherInputSchema: z.ZodType<Prisma.LessonCreateWithoutTeacherInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			room: z.lazy(() => RoomCreateNestedOneWithoutLessonsInputSchema),
			subject: z.lazy(
				() => SubjectCreateNestedOneWithoutLessonsInputSchema
			),
			schedule: z.lazy(
				() => ScheduleCreateNestedOneWithoutLessonsInputSchema
			),
		})
		.strict();

export const LessonUncheckedCreateWithoutTeacherInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutTeacherInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			roomId: z.string(),
			subjectId: z.string(),
			scheduleId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonCreateOrConnectWithoutTeacherInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutTeacherInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => LessonCreateWithoutTeacherInputSchema),
				z.lazy(() => LessonUncheckedCreateWithoutTeacherInputSchema),
			]),
		})
		.strict();

export const LessonCreateManyTeacherInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManyTeacherInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => LessonCreateManyTeacherInputSchema),
				z.lazy(() => LessonCreateManyTeacherInputSchema).array(),
			]),
		})
		.strict();

export const SubjectCreateWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectCreateWithoutTeachersInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutSubjectsInputSchema
			),
			lessons: z
				.lazy(() => LessonCreateNestedManyWithoutSubjectInputSchema)
				.optional(),
		})
		.strict();

export const SubjectUncheckedCreateWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateWithoutTeachersInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectCreateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedCreateNestedManyWithoutSubjectInputSchema
				)
				.optional(),
		})
		.strict();

export const SubjectCreateOrConnectWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectCreateOrConnectWithoutTeachersInput> =
	z
		.object({
			where: z.lazy(() => SubjectWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
				z.lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema),
			]),
		})
		.strict();

export const SchoolUpsertWithoutTeachersInputSchema: z.ZodType<Prisma.SchoolUpsertWithoutTeachersInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => SchoolUpdateWithoutTeachersInputSchema),
				z.lazy(() => SchoolUncheckedUpdateWithoutTeachersInputSchema),
			]),
			create: z.union([
				z.lazy(() => SchoolCreateWithoutTeachersInputSchema),
				z.lazy(() => SchoolUncheckedCreateWithoutTeachersInputSchema),
			]),
			where: z.lazy(() => SchoolWhereInputSchema).optional(),
		})
		.strict();

export const SchoolUpdateToOneWithWhereWithoutTeachersInputSchema: z.ZodType<Prisma.SchoolUpdateToOneWithWhereWithoutTeachersInput> =
	z
		.object({
			where: z.lazy(() => SchoolWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => SchoolUpdateWithoutTeachersInputSchema),
				z.lazy(() => SchoolUncheckedUpdateWithoutTeachersInputSchema),
			]),
		})
		.strict();

export const SchoolUpdateWithoutTeachersInputSchema: z.ZodType<Prisma.SchoolUpdateWithoutTeachersInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classes: z
				.lazy(() => SchoolClassUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
			subjects: z
				.lazy(() => SubjectUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
			buildings: z
				.lazy(() => BuildingUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
		})
		.strict();

export const SchoolUncheckedUpdateWithoutTeachersInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateWithoutTeachersInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classes: z
				.lazy(
					() =>
						SchoolClassUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			buildings: z
				.lazy(
					() =>
						BuildingUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const LessonUpsertWithWhereUniqueWithoutTeacherInputSchema: z.ZodType<Prisma.LessonUpsertWithWhereUniqueWithoutTeacherInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => LessonUpdateWithoutTeacherInputSchema),
				z.lazy(() => LessonUncheckedUpdateWithoutTeacherInputSchema),
			]),
			create: z.union([
				z.lazy(() => LessonCreateWithoutTeacherInputSchema),
				z.lazy(() => LessonUncheckedCreateWithoutTeacherInputSchema),
			]),
		})
		.strict();

export const LessonUpdateWithWhereUniqueWithoutTeacherInputSchema: z.ZodType<Prisma.LessonUpdateWithWhereUniqueWithoutTeacherInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => LessonUpdateWithoutTeacherInputSchema),
				z.lazy(() => LessonUncheckedUpdateWithoutTeacherInputSchema),
			]),
		})
		.strict();

export const LessonUpdateManyWithWhereWithoutTeacherInputSchema: z.ZodType<Prisma.LessonUpdateManyWithWhereWithoutTeacherInput> =
	z
		.object({
			where: z.lazy(() => LessonScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => LessonUpdateManyMutationInputSchema),
				z.lazy(
					() => LessonUncheckedUpdateManyWithoutTeacherInputSchema
				),
			]),
		})
		.strict();

export const LessonScalarWhereInputSchema: z.ZodType<Prisma.LessonScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => LessonScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => LessonScalarWhereInputSchema),
					z.lazy(() => LessonScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			lessonNumber: z
				.union([z.lazy(() => IntFilterSchema), z.number()])
				.optional(),
			startTime: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			endTime: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => EnumLessonWeekFilterSchema),
					z.lazy(() => LessonWeekSchema),
				])
				.optional(),
			roomId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			teacherId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			subjectId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			scheduleId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUpsertWithWhereUniqueWithoutTeachersInput> =
	z
		.object({
			where: z.lazy(() => SubjectWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => SubjectUpdateWithoutTeachersInputSchema),
				z.lazy(() => SubjectUncheckedUpdateWithoutTeachersInputSchema),
			]),
			create: z.union([
				z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
				z.lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema),
			]),
		})
		.strict();

export const SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUpdateWithWhereUniqueWithoutTeachersInput> =
	z
		.object({
			where: z.lazy(() => SubjectWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => SubjectUpdateWithoutTeachersInputSchema),
				z.lazy(() => SubjectUncheckedUpdateWithoutTeachersInputSchema),
			]),
		})
		.strict();

export const SubjectUpdateManyWithWhereWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUpdateManyWithWhereWithoutTeachersInput> =
	z
		.object({
			where: z.lazy(() => SubjectScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => SubjectUpdateManyMutationInputSchema),
				z.lazy(
					() => SubjectUncheckedUpdateManyWithoutTeachersInputSchema
				),
			]),
		})
		.strict();

export const SubjectScalarWhereInputSchema: z.ZodType<Prisma.SubjectScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => SubjectScalarWhereInputSchema),
					z.lazy(() => SubjectScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => SubjectScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => SubjectScalarWhereInputSchema),
					z.lazy(() => SubjectScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			schoolId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			teacherIds: z.lazy(() => StringNullableListFilterSchema).optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const SchoolClassCreateWithoutStudentsInputSchema: z.ZodType<Prisma.SchoolClassCreateWithoutStudentsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutClassesInputSchema
			),
			weeklySchedule: z
				.lazy(() => ScheduleCreateNestedManyWithoutClassInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedCreateWithoutStudentsInputSchema: z.ZodType<Prisma.SchoolClassUncheckedCreateWithoutStudentsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			weeklySchedule: z
				.lazy(
					() =>
						ScheduleUncheckedCreateNestedManyWithoutClassInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolClassCreateOrConnectWithoutStudentsInputSchema: z.ZodType<Prisma.SchoolClassCreateOrConnectWithoutStudentsInput> =
	z
		.object({
			where: z.lazy(() => SchoolClassWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SchoolClassCreateWithoutStudentsInputSchema),
				z.lazy(
					() => SchoolClassUncheckedCreateWithoutStudentsInputSchema
				),
			]),
		})
		.strict();

export const SchoolClassUpsertWithoutStudentsInputSchema: z.ZodType<Prisma.SchoolClassUpsertWithoutStudentsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => SchoolClassUpdateWithoutStudentsInputSchema),
				z.lazy(
					() => SchoolClassUncheckedUpdateWithoutStudentsInputSchema
				),
			]),
			create: z.union([
				z.lazy(() => SchoolClassCreateWithoutStudentsInputSchema),
				z.lazy(
					() => SchoolClassUncheckedCreateWithoutStudentsInputSchema
				),
			]),
			where: z.lazy(() => SchoolClassWhereInputSchema).optional(),
		})
		.strict();

export const SchoolClassUpdateToOneWithWhereWithoutStudentsInputSchema: z.ZodType<Prisma.SchoolClassUpdateToOneWithWhereWithoutStudentsInput> =
	z
		.object({
			where: z.lazy(() => SchoolClassWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => SchoolClassUpdateWithoutStudentsInputSchema),
				z.lazy(
					() => SchoolClassUncheckedUpdateWithoutStudentsInputSchema
				),
			]),
		})
		.strict();

export const SchoolClassUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.SchoolClassUpdateWithoutStudentsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() => SchoolUpdateOneRequiredWithoutClassesNestedInputSchema
				)
				.optional(),
			weeklySchedule: z
				.lazy(() => ScheduleUpdateManyWithoutClassNestedInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedUpdateWithoutStudentsInputSchema: z.ZodType<Prisma.SchoolClassUncheckedUpdateWithoutStudentsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			weeklySchedule: z
				.lazy(
					() =>
						ScheduleUncheckedUpdateManyWithoutClassNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolCreateWithoutSubjectsInputSchema: z.ZodType<Prisma.SchoolCreateWithoutSubjectsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classes: z
				.lazy(() => SchoolClassCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
			buildings: z
				.lazy(() => BuildingCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
		})
		.strict();

export const SchoolUncheckedCreateWithoutSubjectsInputSchema: z.ZodType<Prisma.SchoolUncheckedCreateWithoutSubjectsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classes: z
				.lazy(
					() =>
						SchoolClassUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			buildings: z
				.lazy(
					() =>
						BuildingUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolCreateOrConnectWithoutSubjectsInputSchema: z.ZodType<Prisma.SchoolCreateOrConnectWithoutSubjectsInput> =
	z
		.object({
			where: z.lazy(() => SchoolWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SchoolCreateWithoutSubjectsInputSchema),
				z.lazy(() => SchoolUncheckedCreateWithoutSubjectsInputSchema),
			]),
		})
		.strict();

export const LessonCreateWithoutSubjectInputSchema: z.ZodType<Prisma.LessonCreateWithoutSubjectInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			room: z.lazy(() => RoomCreateNestedOneWithoutLessonsInputSchema),
			teacher: z.lazy(
				() => TeacherCreateNestedOneWithoutLessonsInputSchema
			),
			schedule: z.lazy(
				() => ScheduleCreateNestedOneWithoutLessonsInputSchema
			),
		})
		.strict();

export const LessonUncheckedCreateWithoutSubjectInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutSubjectInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			roomId: z.string(),
			teacherId: z.string(),
			scheduleId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonCreateOrConnectWithoutSubjectInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutSubjectInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => LessonCreateWithoutSubjectInputSchema),
				z.lazy(() => LessonUncheckedCreateWithoutSubjectInputSchema),
			]),
		})
		.strict();

export const LessonCreateManySubjectInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManySubjectInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => LessonCreateManySubjectInputSchema),
				z.lazy(() => LessonCreateManySubjectInputSchema).array(),
			]),
		})
		.strict();

export const TeacherCreateWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateWithoutSubjectsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutTeachersInputSchema
			),
			lessons: z
				.lazy(() => LessonCreateNestedManyWithoutTeacherInputSchema)
				.optional(),
		})
		.strict();

export const TeacherUncheckedCreateWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateWithoutSubjectsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherCreatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedCreateNestedManyWithoutTeacherInputSchema
				)
				.optional(),
		})
		.strict();

export const TeacherCreateOrConnectWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateOrConnectWithoutSubjectsInput> =
	z
		.object({
			where: z.lazy(() => TeacherWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
				z.lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema),
			]),
		})
		.strict();

export const SchoolUpsertWithoutSubjectsInputSchema: z.ZodType<Prisma.SchoolUpsertWithoutSubjectsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => SchoolUpdateWithoutSubjectsInputSchema),
				z.lazy(() => SchoolUncheckedUpdateWithoutSubjectsInputSchema),
			]),
			create: z.union([
				z.lazy(() => SchoolCreateWithoutSubjectsInputSchema),
				z.lazy(() => SchoolUncheckedCreateWithoutSubjectsInputSchema),
			]),
			where: z.lazy(() => SchoolWhereInputSchema).optional(),
		})
		.strict();

export const SchoolUpdateToOneWithWhereWithoutSubjectsInputSchema: z.ZodType<Prisma.SchoolUpdateToOneWithWhereWithoutSubjectsInput> =
	z
		.object({
			where: z.lazy(() => SchoolWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => SchoolUpdateWithoutSubjectsInputSchema),
				z.lazy(() => SchoolUncheckedUpdateWithoutSubjectsInputSchema),
			]),
		})
		.strict();

export const SchoolUpdateWithoutSubjectsInputSchema: z.ZodType<Prisma.SchoolUpdateWithoutSubjectsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classes: z
				.lazy(() => SchoolClassUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
			buildings: z
				.lazy(() => BuildingUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
		})
		.strict();

export const SchoolUncheckedUpdateWithoutSubjectsInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateWithoutSubjectsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classes: z
				.lazy(
					() =>
						SchoolClassUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			buildings: z
				.lazy(
					() =>
						BuildingUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const LessonUpsertWithWhereUniqueWithoutSubjectInputSchema: z.ZodType<Prisma.LessonUpsertWithWhereUniqueWithoutSubjectInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => LessonUpdateWithoutSubjectInputSchema),
				z.lazy(() => LessonUncheckedUpdateWithoutSubjectInputSchema),
			]),
			create: z.union([
				z.lazy(() => LessonCreateWithoutSubjectInputSchema),
				z.lazy(() => LessonUncheckedCreateWithoutSubjectInputSchema),
			]),
		})
		.strict();

export const LessonUpdateWithWhereUniqueWithoutSubjectInputSchema: z.ZodType<Prisma.LessonUpdateWithWhereUniqueWithoutSubjectInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => LessonUpdateWithoutSubjectInputSchema),
				z.lazy(() => LessonUncheckedUpdateWithoutSubjectInputSchema),
			]),
		})
		.strict();

export const LessonUpdateManyWithWhereWithoutSubjectInputSchema: z.ZodType<Prisma.LessonUpdateManyWithWhereWithoutSubjectInput> =
	z
		.object({
			where: z.lazy(() => LessonScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => LessonUpdateManyMutationInputSchema),
				z.lazy(
					() => LessonUncheckedUpdateManyWithoutSubjectInputSchema
				),
			]),
		})
		.strict();

export const TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUpsertWithWhereUniqueWithoutSubjectsInput> =
	z
		.object({
			where: z.lazy(() => TeacherWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => TeacherUpdateWithoutSubjectsInputSchema),
				z.lazy(() => TeacherUncheckedUpdateWithoutSubjectsInputSchema),
			]),
			create: z.union([
				z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
				z.lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema),
			]),
		})
		.strict();

export const TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUpdateWithWhereUniqueWithoutSubjectsInput> =
	z
		.object({
			where: z.lazy(() => TeacherWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => TeacherUpdateWithoutSubjectsInputSchema),
				z.lazy(() => TeacherUncheckedUpdateWithoutSubjectsInputSchema),
			]),
		})
		.strict();

export const TeacherUpdateManyWithWhereWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUpdateManyWithWhereWithoutSubjectsInput> =
	z
		.object({
			where: z.lazy(() => TeacherScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => TeacherUpdateManyMutationInputSchema),
				z.lazy(
					() => TeacherUncheckedUpdateManyWithoutSubjectsInputSchema
				),
			]),
		})
		.strict();

export const TeacherScalarWhereInputSchema: z.ZodType<Prisma.TeacherScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => TeacherScalarWhereInputSchema),
					z.lazy(() => TeacherScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => TeacherScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => TeacherScalarWhereInputSchema),
					z.lazy(() => TeacherScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			schoolId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			subjectIds: z.lazy(() => StringNullableListFilterSchema).optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const RoomCreateWithoutLessonsInputSchema: z.ZodType<Prisma.RoomCreateWithoutLessonsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			floor: z.lazy(() => FloorCreateNestedOneWithoutRoomsInputSchema),
		})
		.strict();

export const RoomUncheckedCreateWithoutLessonsInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutLessonsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			floorId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const RoomCreateOrConnectWithoutLessonsInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutLessonsInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => RoomCreateWithoutLessonsInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutLessonsInputSchema),
			]),
		})
		.strict();

export const TeacherCreateWithoutLessonsInputSchema: z.ZodType<Prisma.TeacherCreateWithoutLessonsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutTeachersInputSchema
			),
			subjects: z
				.lazy(() => SubjectCreateNestedManyWithoutTeachersInputSchema)
				.optional(),
		})
		.strict();

export const TeacherUncheckedCreateWithoutLessonsInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateWithoutLessonsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherCreatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedCreateNestedManyWithoutTeachersInputSchema
				)
				.optional(),
		})
		.strict();

export const TeacherCreateOrConnectWithoutLessonsInputSchema: z.ZodType<Prisma.TeacherCreateOrConnectWithoutLessonsInput> =
	z
		.object({
			where: z.lazy(() => TeacherWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TeacherCreateWithoutLessonsInputSchema),
				z.lazy(() => TeacherUncheckedCreateWithoutLessonsInputSchema),
			]),
		})
		.strict();

export const SubjectCreateWithoutLessonsInputSchema: z.ZodType<Prisma.SubjectCreateWithoutLessonsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutSubjectsInputSchema
			),
			teachers: z
				.lazy(() => TeacherCreateNestedManyWithoutSubjectsInputSchema)
				.optional(),
		})
		.strict();

export const SubjectUncheckedCreateWithoutLessonsInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateWithoutLessonsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectCreateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedCreateNestedManyWithoutSubjectsInputSchema
				)
				.optional(),
		})
		.strict();

export const SubjectCreateOrConnectWithoutLessonsInputSchema: z.ZodType<Prisma.SubjectCreateOrConnectWithoutLessonsInput> =
	z
		.object({
			where: z.lazy(() => SubjectWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SubjectCreateWithoutLessonsInputSchema),
				z.lazy(() => SubjectUncheckedCreateWithoutLessonsInputSchema),
			]),
		})
		.strict();

export const ScheduleCreateWithoutLessonsInputSchema: z.ZodType<Prisma.ScheduleCreateWithoutLessonsInput> =
	z
		.object({
			id: z.string().optional(),
			day: z.lazy(() => DaySchema),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			class: z.lazy(
				() => SchoolClassCreateNestedOneWithoutWeeklyScheduleInputSchema
			),
		})
		.strict();

export const ScheduleUncheckedCreateWithoutLessonsInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateWithoutLessonsInput> =
	z
		.object({
			id: z.string().optional(),
			day: z.lazy(() => DaySchema),
			classId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const ScheduleCreateOrConnectWithoutLessonsInputSchema: z.ZodType<Prisma.ScheduleCreateOrConnectWithoutLessonsInput> =
	z
		.object({
			where: z.lazy(() => ScheduleWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ScheduleCreateWithoutLessonsInputSchema),
				z.lazy(() => ScheduleUncheckedCreateWithoutLessonsInputSchema),
			]),
		})
		.strict();

export const RoomUpsertWithoutLessonsInputSchema: z.ZodType<Prisma.RoomUpsertWithoutLessonsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => RoomUpdateWithoutLessonsInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutLessonsInputSchema),
			]),
			create: z.union([
				z.lazy(() => RoomCreateWithoutLessonsInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutLessonsInputSchema),
			]),
			where: z.lazy(() => RoomWhereInputSchema).optional(),
		})
		.strict();

export const RoomUpdateToOneWithWhereWithoutLessonsInputSchema: z.ZodType<Prisma.RoomUpdateToOneWithWhereWithoutLessonsInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => RoomUpdateWithoutLessonsInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutLessonsInputSchema),
			]),
		})
		.strict();

export const RoomUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.RoomUpdateWithoutLessonsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			floor: z
				.lazy(() => FloorUpdateOneRequiredWithoutRoomsNestedInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutLessonsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			floorId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TeacherUpsertWithoutLessonsInputSchema: z.ZodType<Prisma.TeacherUpsertWithoutLessonsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => TeacherUpdateWithoutLessonsInputSchema),
				z.lazy(() => TeacherUncheckedUpdateWithoutLessonsInputSchema),
			]),
			create: z.union([
				z.lazy(() => TeacherCreateWithoutLessonsInputSchema),
				z.lazy(() => TeacherUncheckedCreateWithoutLessonsInputSchema),
			]),
			where: z.lazy(() => TeacherWhereInputSchema).optional(),
		})
		.strict();

export const TeacherUpdateToOneWithWhereWithoutLessonsInputSchema: z.ZodType<Prisma.TeacherUpdateToOneWithWhereWithoutLessonsInput> =
	z
		.object({
			where: z.lazy(() => TeacherWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => TeacherUpdateWithoutLessonsInputSchema),
				z.lazy(() => TeacherUncheckedUpdateWithoutLessonsInputSchema),
			]),
		})
		.strict();

export const TeacherUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.TeacherUpdateWithoutLessonsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() =>
						SchoolUpdateOneRequiredWithoutTeachersNestedInputSchema
				)
				.optional(),
			subjects: z
				.lazy(() => SubjectUpdateManyWithoutTeachersNestedInputSchema)
				.optional(),
		})
		.strict();

export const TeacherUncheckedUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateWithoutLessonsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherUpdatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedUpdateManyWithoutTeachersNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const SubjectUpsertWithoutLessonsInputSchema: z.ZodType<Prisma.SubjectUpsertWithoutLessonsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => SubjectUpdateWithoutLessonsInputSchema),
				z.lazy(() => SubjectUncheckedUpdateWithoutLessonsInputSchema),
			]),
			create: z.union([
				z.lazy(() => SubjectCreateWithoutLessonsInputSchema),
				z.lazy(() => SubjectUncheckedCreateWithoutLessonsInputSchema),
			]),
			where: z.lazy(() => SubjectWhereInputSchema).optional(),
		})
		.strict();

export const SubjectUpdateToOneWithWhereWithoutLessonsInputSchema: z.ZodType<Prisma.SubjectUpdateToOneWithWhereWithoutLessonsInput> =
	z
		.object({
			where: z.lazy(() => SubjectWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => SubjectUpdateWithoutLessonsInputSchema),
				z.lazy(() => SubjectUncheckedUpdateWithoutLessonsInputSchema),
			]),
		})
		.strict();

export const SubjectUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.SubjectUpdateWithoutLessonsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() =>
						SchoolUpdateOneRequiredWithoutSubjectsNestedInputSchema
				)
				.optional(),
			teachers: z
				.lazy(() => TeacherUpdateManyWithoutSubjectsNestedInputSchema)
				.optional(),
		})
		.strict();

export const SubjectUncheckedUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateWithoutLessonsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectUpdateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedUpdateManyWithoutSubjectsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ScheduleUpsertWithoutLessonsInputSchema: z.ZodType<Prisma.ScheduleUpsertWithoutLessonsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => ScheduleUpdateWithoutLessonsInputSchema),
				z.lazy(() => ScheduleUncheckedUpdateWithoutLessonsInputSchema),
			]),
			create: z.union([
				z.lazy(() => ScheduleCreateWithoutLessonsInputSchema),
				z.lazy(() => ScheduleUncheckedCreateWithoutLessonsInputSchema),
			]),
			where: z.lazy(() => ScheduleWhereInputSchema).optional(),
		})
		.strict();

export const ScheduleUpdateToOneWithWhereWithoutLessonsInputSchema: z.ZodType<Prisma.ScheduleUpdateToOneWithWhereWithoutLessonsInput> =
	z
		.object({
			where: z.lazy(() => ScheduleWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => ScheduleUpdateWithoutLessonsInputSchema),
				z.lazy(() => ScheduleUncheckedUpdateWithoutLessonsInputSchema),
			]),
		})
		.strict();

export const ScheduleUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.ScheduleUpdateWithoutLessonsInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			class: z
				.lazy(
					() =>
						SchoolClassUpdateOneRequiredWithoutWeeklyScheduleNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ScheduleUncheckedUpdateWithoutLessonsInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateWithoutLessonsInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SchoolClassCreateWithoutWeeklyScheduleInputSchema: z.ZodType<Prisma.SchoolClassCreateWithoutWeeklyScheduleInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutClassesInputSchema
			),
			students: z
				.lazy(() => StudentCreateNestedManyWithoutClassInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedCreateWithoutWeeklyScheduleInputSchema: z.ZodType<Prisma.SchoolClassUncheckedCreateWithoutWeeklyScheduleInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			students: z
				.lazy(
					() =>
						StudentUncheckedCreateNestedManyWithoutClassInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolClassCreateOrConnectWithoutWeeklyScheduleInputSchema: z.ZodType<Prisma.SchoolClassCreateOrConnectWithoutWeeklyScheduleInput> =
	z
		.object({
			where: z.lazy(() => SchoolClassWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SchoolClassCreateWithoutWeeklyScheduleInputSchema),
				z.lazy(
					() =>
						SchoolClassUncheckedCreateWithoutWeeklyScheduleInputSchema
				),
			]),
		})
		.strict();

export const LessonCreateWithoutScheduleInputSchema: z.ZodType<Prisma.LessonCreateWithoutScheduleInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			room: z.lazy(() => RoomCreateNestedOneWithoutLessonsInputSchema),
			teacher: z.lazy(
				() => TeacherCreateNestedOneWithoutLessonsInputSchema
			),
			subject: z.lazy(
				() => SubjectCreateNestedOneWithoutLessonsInputSchema
			),
		})
		.strict();

export const LessonUncheckedCreateWithoutScheduleInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutScheduleInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			roomId: z.string(),
			teacherId: z.string(),
			subjectId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonCreateOrConnectWithoutScheduleInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutScheduleInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => LessonCreateWithoutScheduleInputSchema),
				z.lazy(() => LessonUncheckedCreateWithoutScheduleInputSchema),
			]),
		})
		.strict();

export const LessonCreateManyScheduleInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManyScheduleInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => LessonCreateManyScheduleInputSchema),
				z.lazy(() => LessonCreateManyScheduleInputSchema).array(),
			]),
		})
		.strict();

export const SchoolClassUpsertWithoutWeeklyScheduleInputSchema: z.ZodType<Prisma.SchoolClassUpsertWithoutWeeklyScheduleInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => SchoolClassUpdateWithoutWeeklyScheduleInputSchema),
				z.lazy(
					() =>
						SchoolClassUncheckedUpdateWithoutWeeklyScheduleInputSchema
				),
			]),
			create: z.union([
				z.lazy(() => SchoolClassCreateWithoutWeeklyScheduleInputSchema),
				z.lazy(
					() =>
						SchoolClassUncheckedCreateWithoutWeeklyScheduleInputSchema
				),
			]),
			where: z.lazy(() => SchoolClassWhereInputSchema).optional(),
		})
		.strict();

export const SchoolClassUpdateToOneWithWhereWithoutWeeklyScheduleInputSchema: z.ZodType<Prisma.SchoolClassUpdateToOneWithWhereWithoutWeeklyScheduleInput> =
	z
		.object({
			where: z.lazy(() => SchoolClassWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => SchoolClassUpdateWithoutWeeklyScheduleInputSchema),
				z.lazy(
					() =>
						SchoolClassUncheckedUpdateWithoutWeeklyScheduleInputSchema
				),
			]),
		})
		.strict();

export const SchoolClassUpdateWithoutWeeklyScheduleInputSchema: z.ZodType<Prisma.SchoolClassUpdateWithoutWeeklyScheduleInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() => SchoolUpdateOneRequiredWithoutClassesNestedInputSchema
				)
				.optional(),
			students: z
				.lazy(() => StudentUpdateManyWithoutClassNestedInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedUpdateWithoutWeeklyScheduleInputSchema: z.ZodType<Prisma.SchoolClassUncheckedUpdateWithoutWeeklyScheduleInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			students: z
				.lazy(
					() =>
						StudentUncheckedUpdateManyWithoutClassNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const LessonUpsertWithWhereUniqueWithoutScheduleInputSchema: z.ZodType<Prisma.LessonUpsertWithWhereUniqueWithoutScheduleInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => LessonUpdateWithoutScheduleInputSchema),
				z.lazy(() => LessonUncheckedUpdateWithoutScheduleInputSchema),
			]),
			create: z.union([
				z.lazy(() => LessonCreateWithoutScheduleInputSchema),
				z.lazy(() => LessonUncheckedCreateWithoutScheduleInputSchema),
			]),
		})
		.strict();

export const LessonUpdateWithWhereUniqueWithoutScheduleInputSchema: z.ZodType<Prisma.LessonUpdateWithWhereUniqueWithoutScheduleInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => LessonUpdateWithoutScheduleInputSchema),
				z.lazy(() => LessonUncheckedUpdateWithoutScheduleInputSchema),
			]),
		})
		.strict();

export const LessonUpdateManyWithWhereWithoutScheduleInputSchema: z.ZodType<Prisma.LessonUpdateManyWithWhereWithoutScheduleInput> =
	z
		.object({
			where: z.lazy(() => LessonScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => LessonUpdateManyMutationInputSchema),
				z.lazy(
					() => LessonUncheckedUpdateManyWithoutScheduleInputSchema
				),
			]),
		})
		.strict();

export const SchoolCreateWithoutClassesInputSchema: z.ZodType<Prisma.SchoolCreateWithoutClassesInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			subjects: z
				.lazy(() => SubjectCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
			buildings: z
				.lazy(() => BuildingCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
		})
		.strict();

export const SchoolUncheckedCreateWithoutClassesInputSchema: z.ZodType<Prisma.SchoolUncheckedCreateWithoutClassesInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			buildings: z
				.lazy(
					() =>
						BuildingUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolCreateOrConnectWithoutClassesInputSchema: z.ZodType<Prisma.SchoolCreateOrConnectWithoutClassesInput> =
	z
		.object({
			where: z.lazy(() => SchoolWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SchoolCreateWithoutClassesInputSchema),
				z.lazy(() => SchoolUncheckedCreateWithoutClassesInputSchema),
			]),
		})
		.strict();

export const StudentCreateWithoutClassInputSchema: z.ZodType<Prisma.StudentCreateWithoutClassInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const StudentUncheckedCreateWithoutClassInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutClassInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const StudentCreateOrConnectWithoutClassInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutClassInput> =
	z
		.object({
			where: z.lazy(() => StudentWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => StudentCreateWithoutClassInputSchema),
				z.lazy(() => StudentUncheckedCreateWithoutClassInputSchema),
			]),
		})
		.strict();

export const StudentCreateManyClassInputEnvelopeSchema: z.ZodType<Prisma.StudentCreateManyClassInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => StudentCreateManyClassInputSchema),
				z.lazy(() => StudentCreateManyClassInputSchema).array(),
			]),
		})
		.strict();

export const ScheduleCreateWithoutClassInputSchema: z.ZodType<Prisma.ScheduleCreateWithoutClassInput> =
	z
		.object({
			id: z.string().optional(),
			day: z.lazy(() => DaySchema),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(() => LessonCreateNestedManyWithoutScheduleInputSchema)
				.optional(),
		})
		.strict();

export const ScheduleUncheckedCreateWithoutClassInputSchema: z.ZodType<Prisma.ScheduleUncheckedCreateWithoutClassInput> =
	z
		.object({
			id: z.string().optional(),
			day: z.lazy(() => DaySchema),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedCreateNestedManyWithoutScheduleInputSchema
				)
				.optional(),
		})
		.strict();

export const ScheduleCreateOrConnectWithoutClassInputSchema: z.ZodType<Prisma.ScheduleCreateOrConnectWithoutClassInput> =
	z
		.object({
			where: z.lazy(() => ScheduleWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ScheduleCreateWithoutClassInputSchema),
				z.lazy(() => ScheduleUncheckedCreateWithoutClassInputSchema),
			]),
		})
		.strict();

export const ScheduleCreateManyClassInputEnvelopeSchema: z.ZodType<Prisma.ScheduleCreateManyClassInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => ScheduleCreateManyClassInputSchema),
				z.lazy(() => ScheduleCreateManyClassInputSchema).array(),
			]),
		})
		.strict();

export const SchoolUpsertWithoutClassesInputSchema: z.ZodType<Prisma.SchoolUpsertWithoutClassesInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => SchoolUpdateWithoutClassesInputSchema),
				z.lazy(() => SchoolUncheckedUpdateWithoutClassesInputSchema),
			]),
			create: z.union([
				z.lazy(() => SchoolCreateWithoutClassesInputSchema),
				z.lazy(() => SchoolUncheckedCreateWithoutClassesInputSchema),
			]),
			where: z.lazy(() => SchoolWhereInputSchema).optional(),
		})
		.strict();

export const SchoolUpdateToOneWithWhereWithoutClassesInputSchema: z.ZodType<Prisma.SchoolUpdateToOneWithWhereWithoutClassesInput> =
	z
		.object({
			where: z.lazy(() => SchoolWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => SchoolUpdateWithoutClassesInputSchema),
				z.lazy(() => SchoolUncheckedUpdateWithoutClassesInputSchema),
			]),
		})
		.strict();

export const SchoolUpdateWithoutClassesInputSchema: z.ZodType<Prisma.SchoolUpdateWithoutClassesInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjects: z
				.lazy(() => SubjectUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
			buildings: z
				.lazy(() => BuildingUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
		})
		.strict();

export const SchoolUncheckedUpdateWithoutClassesInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateWithoutClassesInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			buildings: z
				.lazy(
					() =>
						BuildingUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const StudentUpsertWithWhereUniqueWithoutClassInputSchema: z.ZodType<Prisma.StudentUpsertWithWhereUniqueWithoutClassInput> =
	z
		.object({
			where: z.lazy(() => StudentWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => StudentUpdateWithoutClassInputSchema),
				z.lazy(() => StudentUncheckedUpdateWithoutClassInputSchema),
			]),
			create: z.union([
				z.lazy(() => StudentCreateWithoutClassInputSchema),
				z.lazy(() => StudentUncheckedCreateWithoutClassInputSchema),
			]),
		})
		.strict();

export const StudentUpdateWithWhereUniqueWithoutClassInputSchema: z.ZodType<Prisma.StudentUpdateWithWhereUniqueWithoutClassInput> =
	z
		.object({
			where: z.lazy(() => StudentWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => StudentUpdateWithoutClassInputSchema),
				z.lazy(() => StudentUncheckedUpdateWithoutClassInputSchema),
			]),
		})
		.strict();

export const StudentUpdateManyWithWhereWithoutClassInputSchema: z.ZodType<Prisma.StudentUpdateManyWithWhereWithoutClassInput> =
	z
		.object({
			where: z.lazy(() => StudentScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => StudentUpdateManyMutationInputSchema),
				z.lazy(() => StudentUncheckedUpdateManyWithoutClassInputSchema),
			]),
		})
		.strict();

export const StudentScalarWhereInputSchema: z.ZodType<Prisma.StudentScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => StudentScalarWhereInputSchema),
					z.lazy(() => StudentScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => StudentScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => StudentScalarWhereInputSchema),
					z.lazy(() => StudentScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			classId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const ScheduleUpsertWithWhereUniqueWithoutClassInputSchema: z.ZodType<Prisma.ScheduleUpsertWithWhereUniqueWithoutClassInput> =
	z
		.object({
			where: z.lazy(() => ScheduleWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => ScheduleUpdateWithoutClassInputSchema),
				z.lazy(() => ScheduleUncheckedUpdateWithoutClassInputSchema),
			]),
			create: z.union([
				z.lazy(() => ScheduleCreateWithoutClassInputSchema),
				z.lazy(() => ScheduleUncheckedCreateWithoutClassInputSchema),
			]),
		})
		.strict();

export const ScheduleUpdateWithWhereUniqueWithoutClassInputSchema: z.ZodType<Prisma.ScheduleUpdateWithWhereUniqueWithoutClassInput> =
	z
		.object({
			where: z.lazy(() => ScheduleWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => ScheduleUpdateWithoutClassInputSchema),
				z.lazy(() => ScheduleUncheckedUpdateWithoutClassInputSchema),
			]),
		})
		.strict();

export const ScheduleUpdateManyWithWhereWithoutClassInputSchema: z.ZodType<Prisma.ScheduleUpdateManyWithWhereWithoutClassInput> =
	z
		.object({
			where: z.lazy(() => ScheduleScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => ScheduleUpdateManyMutationInputSchema),
				z.lazy(
					() => ScheduleUncheckedUpdateManyWithoutClassInputSchema
				),
			]),
		})
		.strict();

export const ScheduleScalarWhereInputSchema: z.ZodType<Prisma.ScheduleScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ScheduleScalarWhereInputSchema),
					z.lazy(() => ScheduleScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => ScheduleScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ScheduleScalarWhereInputSchema),
					z.lazy(() => ScheduleScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			day: z
				.union([
					z.lazy(() => EnumDayFilterSchema),
					z.lazy(() => DaySchema),
				])
				.optional(),
			classId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const SchoolClassCreateWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassCreateWithoutSchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			students: z
				.lazy(() => StudentCreateNestedManyWithoutClassInputSchema)
				.optional(),
			weeklySchedule: z
				.lazy(() => ScheduleCreateNestedManyWithoutClassInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedCreateWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassUncheckedCreateWithoutSchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			students: z
				.lazy(
					() =>
						StudentUncheckedCreateNestedManyWithoutClassInputSchema
				)
				.optional(),
			weeklySchedule: z
				.lazy(
					() =>
						ScheduleUncheckedCreateNestedManyWithoutClassInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolClassCreateOrConnectWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassCreateOrConnectWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => SchoolClassWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SchoolClassCreateWithoutSchoolInputSchema),
				z.lazy(
					() => SchoolClassUncheckedCreateWithoutSchoolInputSchema
				),
			]),
		})
		.strict();

export const SchoolClassCreateManySchoolInputEnvelopeSchema: z.ZodType<Prisma.SchoolClassCreateManySchoolInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => SchoolClassCreateManySchoolInputSchema),
				z.lazy(() => SchoolClassCreateManySchoolInputSchema).array(),
			]),
		})
		.strict();

export const SubjectCreateWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectCreateWithoutSchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(() => LessonCreateNestedManyWithoutSubjectInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherCreateNestedManyWithoutSubjectsInputSchema)
				.optional(),
		})
		.strict();

export const SubjectUncheckedCreateWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateWithoutSchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			teacherIds: z
				.union([
					z.lazy(() => SubjectCreateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedCreateNestedManyWithoutSubjectInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedCreateNestedManyWithoutSubjectsInputSchema
				)
				.optional(),
		})
		.strict();

export const SubjectCreateOrConnectWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectCreateOrConnectWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => SubjectWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SubjectCreateWithoutSchoolInputSchema),
				z.lazy(() => SubjectUncheckedCreateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const SubjectCreateManySchoolInputEnvelopeSchema: z.ZodType<Prisma.SubjectCreateManySchoolInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => SubjectCreateManySchoolInputSchema),
				z.lazy(() => SubjectCreateManySchoolInputSchema).array(),
			]),
		})
		.strict();

export const TeacherCreateWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherCreateWithoutSchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(() => LessonCreateNestedManyWithoutTeacherInputSchema)
				.optional(),
			subjects: z
				.lazy(() => SubjectCreateNestedManyWithoutTeachersInputSchema)
				.optional(),
		})
		.strict();

export const TeacherUncheckedCreateWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateWithoutSchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			subjectIds: z
				.union([
					z.lazy(() => TeacherCreatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedCreateNestedManyWithoutTeacherInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedCreateNestedManyWithoutTeachersInputSchema
				)
				.optional(),
		})
		.strict();

export const TeacherCreateOrConnectWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherCreateOrConnectWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => TeacherWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TeacherCreateWithoutSchoolInputSchema),
				z.lazy(() => TeacherUncheckedCreateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const TeacherCreateManySchoolInputEnvelopeSchema: z.ZodType<Prisma.TeacherCreateManySchoolInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => TeacherCreateManySchoolInputSchema),
				z.lazy(() => TeacherCreateManySchoolInputSchema).array(),
			]),
		})
		.strict();

export const BuildingCreateWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingCreateWithoutSchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			floors: z
				.lazy(() => FloorCreateNestedManyWithoutBuildingInputSchema)
				.optional(),
		})
		.strict();

export const BuildingUncheckedCreateWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingUncheckedCreateWithoutSchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			floors: z
				.lazy(
					() =>
						FloorUncheckedCreateNestedManyWithoutBuildingInputSchema
				)
				.optional(),
		})
		.strict();

export const BuildingCreateOrConnectWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingCreateOrConnectWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => BuildingWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => BuildingCreateWithoutSchoolInputSchema),
				z.lazy(() => BuildingUncheckedCreateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const BuildingCreateManySchoolInputEnvelopeSchema: z.ZodType<Prisma.BuildingCreateManySchoolInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => BuildingCreateManySchoolInputSchema),
				z.lazy(() => BuildingCreateManySchoolInputSchema).array(),
			]),
		})
		.strict();

export const SchoolClassUpsertWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassUpsertWithWhereUniqueWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => SchoolClassWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => SchoolClassUpdateWithoutSchoolInputSchema),
				z.lazy(
					() => SchoolClassUncheckedUpdateWithoutSchoolInputSchema
				),
			]),
			create: z.union([
				z.lazy(() => SchoolClassCreateWithoutSchoolInputSchema),
				z.lazy(
					() => SchoolClassUncheckedCreateWithoutSchoolInputSchema
				),
			]),
		})
		.strict();

export const SchoolClassUpdateWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassUpdateWithWhereUniqueWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => SchoolClassWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => SchoolClassUpdateWithoutSchoolInputSchema),
				z.lazy(
					() => SchoolClassUncheckedUpdateWithoutSchoolInputSchema
				),
			]),
		})
		.strict();

export const SchoolClassUpdateManyWithWhereWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassUpdateManyWithWhereWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => SchoolClassScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => SchoolClassUpdateManyMutationInputSchema),
				z.lazy(
					() => SchoolClassUncheckedUpdateManyWithoutSchoolInputSchema
				),
			]),
		})
		.strict();

export const SchoolClassScalarWhereInputSchema: z.ZodType<Prisma.SchoolClassScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => SchoolClassScalarWhereInputSchema),
					z.lazy(() => SchoolClassScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => SchoolClassScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => SchoolClassScalarWhereInputSchema),
					z.lazy(() => SchoolClassScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			schoolId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const SubjectUpsertWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectUpsertWithWhereUniqueWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => SubjectWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => SubjectUpdateWithoutSchoolInputSchema),
				z.lazy(() => SubjectUncheckedUpdateWithoutSchoolInputSchema),
			]),
			create: z.union([
				z.lazy(() => SubjectCreateWithoutSchoolInputSchema),
				z.lazy(() => SubjectUncheckedCreateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const SubjectUpdateWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectUpdateWithWhereUniqueWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => SubjectWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => SubjectUpdateWithoutSchoolInputSchema),
				z.lazy(() => SubjectUncheckedUpdateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const SubjectUpdateManyWithWhereWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectUpdateManyWithWhereWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => SubjectScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => SubjectUpdateManyMutationInputSchema),
				z.lazy(
					() => SubjectUncheckedUpdateManyWithoutSchoolInputSchema
				),
			]),
		})
		.strict();

export const TeacherUpsertWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherUpsertWithWhereUniqueWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => TeacherWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => TeacherUpdateWithoutSchoolInputSchema),
				z.lazy(() => TeacherUncheckedUpdateWithoutSchoolInputSchema),
			]),
			create: z.union([
				z.lazy(() => TeacherCreateWithoutSchoolInputSchema),
				z.lazy(() => TeacherUncheckedCreateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const TeacherUpdateWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherUpdateWithWhereUniqueWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => TeacherWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => TeacherUpdateWithoutSchoolInputSchema),
				z.lazy(() => TeacherUncheckedUpdateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const TeacherUpdateManyWithWhereWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherUpdateManyWithWhereWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => TeacherScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => TeacherUpdateManyMutationInputSchema),
				z.lazy(
					() => TeacherUncheckedUpdateManyWithoutSchoolInputSchema
				),
			]),
		})
		.strict();

export const BuildingUpsertWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingUpsertWithWhereUniqueWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => BuildingWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => BuildingUpdateWithoutSchoolInputSchema),
				z.lazy(() => BuildingUncheckedUpdateWithoutSchoolInputSchema),
			]),
			create: z.union([
				z.lazy(() => BuildingCreateWithoutSchoolInputSchema),
				z.lazy(() => BuildingUncheckedCreateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const BuildingUpdateWithWhereUniqueWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingUpdateWithWhereUniqueWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => BuildingWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => BuildingUpdateWithoutSchoolInputSchema),
				z.lazy(() => BuildingUncheckedUpdateWithoutSchoolInputSchema),
			]),
		})
		.strict();

export const BuildingUpdateManyWithWhereWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingUpdateManyWithWhereWithoutSchoolInput> =
	z
		.object({
			where: z.lazy(() => BuildingScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => BuildingUpdateManyMutationInputSchema),
				z.lazy(
					() => BuildingUncheckedUpdateManyWithoutSchoolInputSchema
				),
			]),
		})
		.strict();

export const BuildingScalarWhereInputSchema: z.ZodType<Prisma.BuildingScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => BuildingScalarWhereInputSchema),
					z.lazy(() => BuildingScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => BuildingScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => BuildingScalarWhereInputSchema),
					z.lazy(() => BuildingScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			schoolId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const SchoolCreateWithoutBuildingsInputSchema: z.ZodType<Prisma.SchoolCreateWithoutBuildingsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classes: z
				.lazy(() => SchoolClassCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
			subjects: z
				.lazy(() => SubjectCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherCreateNestedManyWithoutSchoolInputSchema)
				.optional(),
		})
		.strict();

export const SchoolUncheckedCreateWithoutBuildingsInputSchema: z.ZodType<Prisma.SchoolUncheckedCreateWithoutBuildingsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			classes: z
				.lazy(
					() =>
						SchoolClassUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedCreateNestedManyWithoutSchoolInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolCreateOrConnectWithoutBuildingsInputSchema: z.ZodType<Prisma.SchoolCreateOrConnectWithoutBuildingsInput> =
	z
		.object({
			where: z.lazy(() => SchoolWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SchoolCreateWithoutBuildingsInputSchema),
				z.lazy(() => SchoolUncheckedCreateWithoutBuildingsInputSchema),
			]),
		})
		.strict();

export const FloorCreateWithoutBuildingInputSchema: z.ZodType<Prisma.FloorCreateWithoutBuildingInput> =
	z
		.object({
			id: z.string().optional(),
			number: z.number().int(),
			description: z.string().optional().nullable(),
			planFilename: z.string().optional().nullable(),
			maskFilename: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			rooms: z
				.lazy(() => RoomCreateNestedManyWithoutFloorInputSchema)
				.optional(),
		})
		.strict();

export const FloorUncheckedCreateWithoutBuildingInputSchema: z.ZodType<Prisma.FloorUncheckedCreateWithoutBuildingInput> =
	z
		.object({
			id: z.string().optional(),
			number: z.number().int(),
			description: z.string().optional().nullable(),
			planFilename: z.string().optional().nullable(),
			maskFilename: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			rooms: z
				.lazy(
					() => RoomUncheckedCreateNestedManyWithoutFloorInputSchema
				)
				.optional(),
		})
		.strict();

export const FloorCreateOrConnectWithoutBuildingInputSchema: z.ZodType<Prisma.FloorCreateOrConnectWithoutBuildingInput> =
	z
		.object({
			where: z.lazy(() => FloorWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => FloorCreateWithoutBuildingInputSchema),
				z.lazy(() => FloorUncheckedCreateWithoutBuildingInputSchema),
			]),
		})
		.strict();

export const FloorCreateManyBuildingInputEnvelopeSchema: z.ZodType<Prisma.FloorCreateManyBuildingInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => FloorCreateManyBuildingInputSchema),
				z.lazy(() => FloorCreateManyBuildingInputSchema).array(),
			]),
		})
		.strict();

export const SchoolUpsertWithoutBuildingsInputSchema: z.ZodType<Prisma.SchoolUpsertWithoutBuildingsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => SchoolUpdateWithoutBuildingsInputSchema),
				z.lazy(() => SchoolUncheckedUpdateWithoutBuildingsInputSchema),
			]),
			create: z.union([
				z.lazy(() => SchoolCreateWithoutBuildingsInputSchema),
				z.lazy(() => SchoolUncheckedCreateWithoutBuildingsInputSchema),
			]),
			where: z.lazy(() => SchoolWhereInputSchema).optional(),
		})
		.strict();

export const SchoolUpdateToOneWithWhereWithoutBuildingsInputSchema: z.ZodType<Prisma.SchoolUpdateToOneWithWhereWithoutBuildingsInput> =
	z
		.object({
			where: z.lazy(() => SchoolWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => SchoolUpdateWithoutBuildingsInputSchema),
				z.lazy(() => SchoolUncheckedUpdateWithoutBuildingsInputSchema),
			]),
		})
		.strict();

export const SchoolUpdateWithoutBuildingsInputSchema: z.ZodType<Prisma.SchoolUpdateWithoutBuildingsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classes: z
				.lazy(() => SchoolClassUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
			subjects: z
				.lazy(() => SubjectUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherUpdateManyWithoutSchoolNestedInputSchema)
				.optional(),
		})
		.strict();

export const SchoolUncheckedUpdateWithoutBuildingsInputSchema: z.ZodType<Prisma.SchoolUncheckedUpdateWithoutBuildingsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			classes: z
				.lazy(
					() =>
						SchoolClassUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedUpdateManyWithoutSchoolNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const FloorUpsertWithWhereUniqueWithoutBuildingInputSchema: z.ZodType<Prisma.FloorUpsertWithWhereUniqueWithoutBuildingInput> =
	z
		.object({
			where: z.lazy(() => FloorWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => FloorUpdateWithoutBuildingInputSchema),
				z.lazy(() => FloorUncheckedUpdateWithoutBuildingInputSchema),
			]),
			create: z.union([
				z.lazy(() => FloorCreateWithoutBuildingInputSchema),
				z.lazy(() => FloorUncheckedCreateWithoutBuildingInputSchema),
			]),
		})
		.strict();

export const FloorUpdateWithWhereUniqueWithoutBuildingInputSchema: z.ZodType<Prisma.FloorUpdateWithWhereUniqueWithoutBuildingInput> =
	z
		.object({
			where: z.lazy(() => FloorWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => FloorUpdateWithoutBuildingInputSchema),
				z.lazy(() => FloorUncheckedUpdateWithoutBuildingInputSchema),
			]),
		})
		.strict();

export const FloorUpdateManyWithWhereWithoutBuildingInputSchema: z.ZodType<Prisma.FloorUpdateManyWithWhereWithoutBuildingInput> =
	z
		.object({
			where: z.lazy(() => FloorScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => FloorUpdateManyMutationInputSchema),
				z.lazy(
					() => FloorUncheckedUpdateManyWithoutBuildingInputSchema
				),
			]),
		})
		.strict();

export const FloorScalarWhereInputSchema: z.ZodType<Prisma.FloorScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => FloorScalarWhereInputSchema),
					z.lazy(() => FloorScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => FloorScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => FloorScalarWhereInputSchema),
					z.lazy(() => FloorScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			number: z
				.union([z.lazy(() => IntFilterSchema), z.number()])
				.optional(),
			description: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			planFilename: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			maskFilename: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			buildingId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const BuildingCreateWithoutFloorsInputSchema: z.ZodType<Prisma.BuildingCreateWithoutFloorsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			school: z.lazy(
				() => SchoolCreateNestedOneWithoutBuildingsInputSchema
			),
		})
		.strict();

export const BuildingUncheckedCreateWithoutFloorsInputSchema: z.ZodType<Prisma.BuildingUncheckedCreateWithoutFloorsInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			schoolId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const BuildingCreateOrConnectWithoutFloorsInputSchema: z.ZodType<Prisma.BuildingCreateOrConnectWithoutFloorsInput> =
	z
		.object({
			where: z.lazy(() => BuildingWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => BuildingCreateWithoutFloorsInputSchema),
				z.lazy(() => BuildingUncheckedCreateWithoutFloorsInputSchema),
			]),
		})
		.strict();

export const RoomCreateWithoutFloorInputSchema: z.ZodType<Prisma.RoomCreateWithoutFloorInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(() => LessonCreateNestedManyWithoutRoomInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedCreateWithoutFloorInputSchema: z.ZodType<Prisma.RoomUncheckedCreateWithoutFloorInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			lessons: z
				.lazy(
					() => LessonUncheckedCreateNestedManyWithoutRoomInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomCreateOrConnectWithoutFloorInputSchema: z.ZodType<Prisma.RoomCreateOrConnectWithoutFloorInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => RoomCreateWithoutFloorInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema),
			]),
		})
		.strict();

export const RoomCreateManyFloorInputEnvelopeSchema: z.ZodType<Prisma.RoomCreateManyFloorInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => RoomCreateManyFloorInputSchema),
				z.lazy(() => RoomCreateManyFloorInputSchema).array(),
			]),
		})
		.strict();

export const BuildingUpsertWithoutFloorsInputSchema: z.ZodType<Prisma.BuildingUpsertWithoutFloorsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => BuildingUpdateWithoutFloorsInputSchema),
				z.lazy(() => BuildingUncheckedUpdateWithoutFloorsInputSchema),
			]),
			create: z.union([
				z.lazy(() => BuildingCreateWithoutFloorsInputSchema),
				z.lazy(() => BuildingUncheckedCreateWithoutFloorsInputSchema),
			]),
			where: z.lazy(() => BuildingWhereInputSchema).optional(),
		})
		.strict();

export const BuildingUpdateToOneWithWhereWithoutFloorsInputSchema: z.ZodType<Prisma.BuildingUpdateToOneWithWhereWithoutFloorsInput> =
	z
		.object({
			where: z.lazy(() => BuildingWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => BuildingUpdateWithoutFloorsInputSchema),
				z.lazy(() => BuildingUncheckedUpdateWithoutFloorsInputSchema),
			]),
		})
		.strict();

export const BuildingUpdateWithoutFloorsInputSchema: z.ZodType<Prisma.BuildingUpdateWithoutFloorsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() =>
						SchoolUpdateOneRequiredWithoutBuildingsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const BuildingUncheckedUpdateWithoutFloorsInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateWithoutFloorsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomUpsertWithWhereUniqueWithoutFloorInputSchema: z.ZodType<Prisma.RoomUpsertWithWhereUniqueWithoutFloorInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => RoomUpdateWithoutFloorInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutFloorInputSchema),
			]),
			create: z.union([
				z.lazy(() => RoomCreateWithoutFloorInputSchema),
				z.lazy(() => RoomUncheckedCreateWithoutFloorInputSchema),
			]),
		})
		.strict();

export const RoomUpdateWithWhereUniqueWithoutFloorInputSchema: z.ZodType<Prisma.RoomUpdateWithWhereUniqueWithoutFloorInput> =
	z
		.object({
			where: z.lazy(() => RoomWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => RoomUpdateWithoutFloorInputSchema),
				z.lazy(() => RoomUncheckedUpdateWithoutFloorInputSchema),
			]),
		})
		.strict();

export const RoomUpdateManyWithWhereWithoutFloorInputSchema: z.ZodType<Prisma.RoomUpdateManyWithWhereWithoutFloorInput> =
	z
		.object({
			where: z.lazy(() => RoomScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => RoomUpdateManyMutationInputSchema),
				z.lazy(() => RoomUncheckedUpdateManyWithoutFloorInputSchema),
			]),
		})
		.strict();

export const RoomScalarWhereInputSchema: z.ZodType<Prisma.RoomScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
			OR: z
				.lazy(() => RoomScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => RoomScalarWhereInputSchema),
					z.lazy(() => RoomScalarWhereInputSchema).array(),
				])
				.optional(),
			id: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			name: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			floorId: z
				.union([z.lazy(() => StringFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
			updatedAt: z
				.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
				.optional(),
		})
		.strict();

export const FloorCreateWithoutRoomsInputSchema: z.ZodType<Prisma.FloorCreateWithoutRoomsInput> =
	z
		.object({
			id: z.string().optional(),
			number: z.number().int(),
			description: z.string().optional().nullable(),
			planFilename: z.string().optional().nullable(),
			maskFilename: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			building: z.lazy(
				() => BuildingCreateNestedOneWithoutFloorsInputSchema
			),
		})
		.strict();

export const FloorUncheckedCreateWithoutRoomsInputSchema: z.ZodType<Prisma.FloorUncheckedCreateWithoutRoomsInput> =
	z
		.object({
			id: z.string().optional(),
			number: z.number().int(),
			description: z.string().optional().nullable(),
			planFilename: z.string().optional().nullable(),
			maskFilename: z.string().optional().nullable(),
			buildingId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const FloorCreateOrConnectWithoutRoomsInputSchema: z.ZodType<Prisma.FloorCreateOrConnectWithoutRoomsInput> =
	z
		.object({
			where: z.lazy(() => FloorWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => FloorCreateWithoutRoomsInputSchema),
				z.lazy(() => FloorUncheckedCreateWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const LessonCreateWithoutRoomInputSchema: z.ZodType<Prisma.LessonCreateWithoutRoomInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			teacher: z.lazy(
				() => TeacherCreateNestedOneWithoutLessonsInputSchema
			),
			subject: z.lazy(
				() => SubjectCreateNestedOneWithoutLessonsInputSchema
			),
			schedule: z.lazy(
				() => ScheduleCreateNestedOneWithoutLessonsInputSchema
			),
		})
		.strict();

export const LessonUncheckedCreateWithoutRoomInputSchema: z.ZodType<Prisma.LessonUncheckedCreateWithoutRoomInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			teacherId: z.string(),
			subjectId: z.string(),
			scheduleId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonCreateOrConnectWithoutRoomInputSchema: z.ZodType<Prisma.LessonCreateOrConnectWithoutRoomInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => LessonCreateWithoutRoomInputSchema),
				z.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema),
			]),
		})
		.strict();

export const LessonCreateManyRoomInputEnvelopeSchema: z.ZodType<Prisma.LessonCreateManyRoomInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => LessonCreateManyRoomInputSchema),
				z.lazy(() => LessonCreateManyRoomInputSchema).array(),
			]),
		})
		.strict();

export const FloorUpsertWithoutRoomsInputSchema: z.ZodType<Prisma.FloorUpsertWithoutRoomsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => FloorUpdateWithoutRoomsInputSchema),
				z.lazy(() => FloorUncheckedUpdateWithoutRoomsInputSchema),
			]),
			create: z.union([
				z.lazy(() => FloorCreateWithoutRoomsInputSchema),
				z.lazy(() => FloorUncheckedCreateWithoutRoomsInputSchema),
			]),
			where: z.lazy(() => FloorWhereInputSchema).optional(),
		})
		.strict();

export const FloorUpdateToOneWithWhereWithoutRoomsInputSchema: z.ZodType<Prisma.FloorUpdateToOneWithWhereWithoutRoomsInput> =
	z
		.object({
			where: z.lazy(() => FloorWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => FloorUpdateWithoutRoomsInputSchema),
				z.lazy(() => FloorUncheckedUpdateWithoutRoomsInputSchema),
			]),
		})
		.strict();

export const FloorUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.FloorUpdateWithoutRoomsInput> =
	z
		.object({
			number: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			building: z
				.lazy(
					() =>
						BuildingUpdateOneRequiredWithoutFloorsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const FloorUncheckedUpdateWithoutRoomsInputSchema: z.ZodType<Prisma.FloorUncheckedUpdateWithoutRoomsInput> =
	z
		.object({
			number: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			buildingId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.LessonUpsertWithWhereUniqueWithoutRoomInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => LessonUpdateWithoutRoomInputSchema),
				z.lazy(() => LessonUncheckedUpdateWithoutRoomInputSchema),
			]),
			create: z.union([
				z.lazy(() => LessonCreateWithoutRoomInputSchema),
				z.lazy(() => LessonUncheckedCreateWithoutRoomInputSchema),
			]),
		})
		.strict();

export const LessonUpdateWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.LessonUpdateWithWhereUniqueWithoutRoomInput> =
	z
		.object({
			where: z.lazy(() => LessonWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => LessonUpdateWithoutRoomInputSchema),
				z.lazy(() => LessonUncheckedUpdateWithoutRoomInputSchema),
			]),
		})
		.strict();

export const LessonUpdateManyWithWhereWithoutRoomInputSchema: z.ZodType<Prisma.LessonUpdateManyWithWhereWithoutRoomInput> =
	z
		.object({
			where: z.lazy(() => LessonScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => LessonUpdateManyMutationInputSchema),
				z.lazy(() => LessonUncheckedUpdateManyWithoutRoomInputSchema),
			]),
		})
		.strict();

export const LessonCreateManyTeacherInputSchema: z.ZodType<Prisma.LessonCreateManyTeacherInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			roomId: z.string(),
			subjectId: z.string(),
			scheduleId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonUpdateWithoutTeacherInputSchema: z.ZodType<Prisma.LessonUpdateWithoutTeacherInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			room: z
				.lazy(
					() => RoomUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
			subject: z
				.lazy(
					() =>
						SubjectUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
			schedule: z
				.lazy(
					() =>
						ScheduleUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateWithoutTeacherInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutTeacherInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			scheduleId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyWithoutTeacherInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutTeacherInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			scheduleId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SubjectUpdateWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUpdateWithoutTeachersInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() =>
						SchoolUpdateOneRequiredWithoutSubjectsNestedInputSchema
				)
				.optional(),
			lessons: z
				.lazy(() => LessonUpdateManyWithoutSubjectNestedInputSchema)
				.optional(),
		})
		.strict();

export const SubjectUncheckedUpdateWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateWithoutTeachersInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectUpdateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedUpdateManyWithoutSubjectNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const SubjectUncheckedUpdateManyWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateManyWithoutTeachersInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectUpdateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonCreateManySubjectInputSchema: z.ZodType<Prisma.LessonCreateManySubjectInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			roomId: z.string(),
			teacherId: z.string(),
			scheduleId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonUpdateWithoutSubjectInputSchema: z.ZodType<Prisma.LessonUpdateWithoutSubjectInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			room: z
				.lazy(
					() => RoomUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
			teacher: z
				.lazy(
					() =>
						TeacherUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
			schedule: z
				.lazy(
					() =>
						ScheduleUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateWithoutSubjectInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutSubjectInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			scheduleId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyWithoutSubjectInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutSubjectInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			scheduleId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TeacherUpdateWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUpdateWithoutSubjectsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			school: z
				.lazy(
					() =>
						SchoolUpdateOneRequiredWithoutTeachersNestedInputSchema
				)
				.optional(),
			lessons: z
				.lazy(() => LessonUpdateManyWithoutTeacherNestedInputSchema)
				.optional(),
		})
		.strict();

export const TeacherUncheckedUpdateWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateWithoutSubjectsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherUpdatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedUpdateManyWithoutTeacherNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const TeacherUncheckedUpdateManyWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateManyWithoutSubjectsInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			schoolId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherUpdatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonCreateManyScheduleInputSchema: z.ZodType<Prisma.LessonCreateManyScheduleInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			roomId: z.string(),
			teacherId: z.string(),
			subjectId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.LessonUpdateWithoutScheduleInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			room: z
				.lazy(
					() => RoomUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
			teacher: z
				.lazy(
					() =>
						TeacherUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
			subject: z
				.lazy(
					() =>
						SubjectUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateWithoutScheduleInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutScheduleInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyWithoutScheduleInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutScheduleInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			roomId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StudentCreateManyClassInputSchema: z.ZodType<Prisma.StudentCreateManyClassInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const ScheduleCreateManyClassInputSchema: z.ZodType<Prisma.ScheduleCreateManyClassInput> =
	z
		.object({
			id: z.string().optional(),
			day: z.lazy(() => DaySchema),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const StudentUpdateWithoutClassInputSchema: z.ZodType<Prisma.StudentUpdateWithoutClassInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StudentUncheckedUpdateWithoutClassInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutClassInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const StudentUncheckedUpdateManyWithoutClassInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyWithoutClassInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const ScheduleUpdateWithoutClassInputSchema: z.ZodType<Prisma.ScheduleUpdateWithoutClassInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(() => LessonUpdateManyWithoutScheduleNestedInputSchema)
				.optional(),
		})
		.strict();

export const ScheduleUncheckedUpdateWithoutClassInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateWithoutClassInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedUpdateManyWithoutScheduleNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const ScheduleUncheckedUpdateManyWithoutClassInputSchema: z.ZodType<Prisma.ScheduleUncheckedUpdateManyWithoutClassInput> =
	z
		.object({
			day: z
				.union([
					z.lazy(() => DaySchema),
					z.lazy(() => EnumDayFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SchoolClassCreateManySchoolInputSchema: z.ZodType<Prisma.SchoolClassCreateManySchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const SubjectCreateManySchoolInputSchema: z.ZodType<Prisma.SubjectCreateManySchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			teacherIds: z
				.union([
					z.lazy(() => SubjectCreateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const TeacherCreateManySchoolInputSchema: z.ZodType<Prisma.TeacherCreateManySchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			subjectIds: z
				.union([
					z.lazy(() => TeacherCreatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const BuildingCreateManySchoolInputSchema: z.ZodType<Prisma.BuildingCreateManySchoolInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const SchoolClassUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassUpdateWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			students: z
				.lazy(() => StudentUpdateManyWithoutClassNestedInputSchema)
				.optional(),
			weeklySchedule: z
				.lazy(() => ScheduleUpdateManyWithoutClassNestedInputSchema)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassUncheckedUpdateWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			students: z
				.lazy(
					() =>
						StudentUncheckedUpdateManyWithoutClassNestedInputSchema
				)
				.optional(),
			weeklySchedule: z
				.lazy(
					() =>
						ScheduleUncheckedUpdateManyWithoutClassNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const SchoolClassUncheckedUpdateManyWithoutSchoolInputSchema: z.ZodType<Prisma.SchoolClassUncheckedUpdateManyWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const SubjectUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectUpdateWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(() => LessonUpdateManyWithoutSubjectNestedInputSchema)
				.optional(),
			teachers: z
				.lazy(() => TeacherUpdateManyWithoutSubjectsNestedInputSchema)
				.optional(),
		})
		.strict();

export const SubjectUncheckedUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectUpdateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedUpdateManyWithoutSubjectNestedInputSchema
				)
				.optional(),
			teachers: z
				.lazy(
					() =>
						TeacherUncheckedUpdateManyWithoutSubjectsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const SubjectUncheckedUpdateManyWithoutSchoolInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateManyWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacherIds: z
				.union([
					z.lazy(() => SubjectUpdateteacherIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const TeacherUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherUpdateWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(() => LessonUpdateManyWithoutTeacherNestedInputSchema)
				.optional(),
			subjects: z
				.lazy(() => SubjectUpdateManyWithoutTeachersNestedInputSchema)
				.optional(),
		})
		.strict();

export const TeacherUncheckedUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherUpdatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() =>
						LessonUncheckedUpdateManyWithoutTeacherNestedInputSchema
				)
				.optional(),
			subjects: z
				.lazy(
					() =>
						SubjectUncheckedUpdateManyWithoutTeachersNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const TeacherUncheckedUpdateManyWithoutSchoolInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateManyWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectIds: z
				.union([
					z.lazy(() => TeacherUpdatesubjectIdsInputSchema),
					z.string().array(),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const BuildingUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingUpdateWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			floors: z
				.lazy(() => FloorUpdateManyWithoutBuildingNestedInputSchema)
				.optional(),
		})
		.strict();

export const BuildingUncheckedUpdateWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			floors: z
				.lazy(
					() =>
						FloorUncheckedUpdateManyWithoutBuildingNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const BuildingUncheckedUpdateManyWithoutSchoolInputSchema: z.ZodType<Prisma.BuildingUncheckedUpdateManyWithoutSchoolInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const FloorCreateManyBuildingInputSchema: z.ZodType<Prisma.FloorCreateManyBuildingInput> =
	z
		.object({
			id: z.string().optional(),
			number: z.number().int(),
			description: z.string().optional().nullable(),
			planFilename: z.string().optional().nullable(),
			maskFilename: z.string().optional().nullable(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const FloorUpdateWithoutBuildingInputSchema: z.ZodType<Prisma.FloorUpdateWithoutBuildingInput> =
	z
		.object({
			number: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(() => RoomUpdateManyWithoutFloorNestedInputSchema)
				.optional(),
		})
		.strict();

export const FloorUncheckedUpdateWithoutBuildingInputSchema: z.ZodType<Prisma.FloorUncheckedUpdateWithoutBuildingInput> =
	z
		.object({
			number: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			rooms: z
				.lazy(
					() => RoomUncheckedUpdateManyWithoutFloorNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const FloorUncheckedUpdateManyWithoutBuildingInputSchema: z.ZodType<Prisma.FloorUncheckedUpdateManyWithoutBuildingInput> =
	z
		.object({
			number: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			description: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			planFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			maskFilename: z
				.union([
					z.string(),
					z.lazy(
						() => NullableStringFieldUpdateOperationsInputSchema
					),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const RoomCreateManyFloorInputSchema: z.ZodType<Prisma.RoomCreateManyFloorInput> =
	z
		.object({
			id: z.string().optional(),
			name: z
				.string()
				.min(1, { message: "Името трябва да сърдържа поне 1 символ" }),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const RoomUpdateWithoutFloorInputSchema: z.ZodType<Prisma.RoomUpdateWithoutFloorInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(() => LessonUpdateManyWithoutRoomNestedInputSchema)
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateWithoutFloorInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateWithoutFloorInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessons: z
				.lazy(
					() => LessonUncheckedUpdateManyWithoutRoomNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const RoomUncheckedUpdateManyWithoutFloorInputSchema: z.ZodType<Prisma.RoomUncheckedUpdateManyWithoutFloorInput> =
	z
		.object({
			name: z
				.union([
					z
						.string()
						.min(1, {
							message: "Името трябва да сърдържа поне 1 символ",
						}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonCreateManyRoomInputSchema: z.ZodType<Prisma.LessonCreateManyRoomInput> =
	z
		.object({
			id: z.string().optional(),
			lessonNumber: z
				.number()
				.gte(0, {
					message:
						"Номерът на часа не може да бъде отрицателно число",
				}),
			startTime: z.coerce.date(),
			endTime: z.coerce.date(),
			lessonWeeks: z.lazy(() => LessonWeekSchema).optional(),
			teacherId: z.string(),
			subjectId: z.string(),
			scheduleId: z.string(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();

export const LessonUpdateWithoutRoomInputSchema: z.ZodType<Prisma.LessonUpdateWithoutRoomInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			teacher: z
				.lazy(
					() =>
						TeacherUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
			subject: z
				.lazy(
					() =>
						SubjectUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
			schedule: z
				.lazy(
					() =>
						ScheduleUpdateOneRequiredWithoutLessonsNestedInputSchema
				)
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateWithoutRoomInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateWithoutRoomInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			teacherId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			scheduleId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

export const LessonUncheckedUpdateManyWithoutRoomInputSchema: z.ZodType<Prisma.LessonUncheckedUpdateManyWithoutRoomInput> =
	z
		.object({
			lessonNumber: z
				.union([
					z
						.number()
						.gte(0, {
							message:
								"Номерът на часа не може да бъде отрицателно число",
						}),
					z.lazy(() => IntFieldUpdateOperationsInputSchema),
				])
				.optional(),
			startTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			endTime: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			lessonWeeks: z
				.union([
					z.lazy(() => LessonWeekSchema),
					z.lazy(
						() => EnumLessonWeekFieldUpdateOperationsInputSchema
					),
				])
				.optional(),
			teacherId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			subjectId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			scheduleId: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
				])
				.optional(),
		})
		.strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TeacherFindFirstArgsSchema: z.ZodType<Prisma.TeacherFindFirstArgs> =
	z
		.object({
			select: TeacherSelectSchema.optional(),
			include: TeacherIncludeSchema.optional(),
			where: TeacherWhereInputSchema.optional(),
			orderBy: z
				.union([
					TeacherOrderByWithRelationInputSchema.array(),
					TeacherOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TeacherWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TeacherScalarFieldEnumSchema,
					TeacherScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TeacherFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeacherFindFirstOrThrowArgs> =
	z
		.object({
			select: TeacherSelectSchema.optional(),
			include: TeacherIncludeSchema.optional(),
			where: TeacherWhereInputSchema.optional(),
			orderBy: z
				.union([
					TeacherOrderByWithRelationInputSchema.array(),
					TeacherOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TeacherWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TeacherScalarFieldEnumSchema,
					TeacherScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TeacherFindManyArgsSchema: z.ZodType<Prisma.TeacherFindManyArgs> =
	z
		.object({
			select: TeacherSelectSchema.optional(),
			include: TeacherIncludeSchema.optional(),
			where: TeacherWhereInputSchema.optional(),
			orderBy: z
				.union([
					TeacherOrderByWithRelationInputSchema.array(),
					TeacherOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TeacherWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TeacherScalarFieldEnumSchema,
					TeacherScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TeacherAggregateArgsSchema: z.ZodType<Prisma.TeacherAggregateArgs> =
	z
		.object({
			where: TeacherWhereInputSchema.optional(),
			orderBy: z
				.union([
					TeacherOrderByWithRelationInputSchema.array(),
					TeacherOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TeacherWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TeacherGroupByArgsSchema: z.ZodType<Prisma.TeacherGroupByArgs> = z
	.object({
		where: TeacherWhereInputSchema.optional(),
		orderBy: z
			.union([
				TeacherOrderByWithAggregationInputSchema.array(),
				TeacherOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: TeacherScalarFieldEnumSchema.array(),
		having: TeacherScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const TeacherFindUniqueArgsSchema: z.ZodType<Prisma.TeacherFindUniqueArgs> =
	z
		.object({
			select: TeacherSelectSchema.optional(),
			include: TeacherIncludeSchema.optional(),
			where: TeacherWhereUniqueInputSchema,
		})
		.strict();

export const TeacherFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeacherFindUniqueOrThrowArgs> =
	z
		.object({
			select: TeacherSelectSchema.optional(),
			include: TeacherIncludeSchema.optional(),
			where: TeacherWhereUniqueInputSchema,
		})
		.strict();

export const StudentFindFirstArgsSchema: z.ZodType<Prisma.StudentFindFirstArgs> =
	z
		.object({
			select: StudentSelectSchema.optional(),
			include: StudentIncludeSchema.optional(),
			where: StudentWhereInputSchema.optional(),
			orderBy: z
				.union([
					StudentOrderByWithRelationInputSchema.array(),
					StudentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: StudentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					StudentScalarFieldEnumSchema,
					StudentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const StudentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StudentFindFirstOrThrowArgs> =
	z
		.object({
			select: StudentSelectSchema.optional(),
			include: StudentIncludeSchema.optional(),
			where: StudentWhereInputSchema.optional(),
			orderBy: z
				.union([
					StudentOrderByWithRelationInputSchema.array(),
					StudentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: StudentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					StudentScalarFieldEnumSchema,
					StudentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const StudentFindManyArgsSchema: z.ZodType<Prisma.StudentFindManyArgs> =
	z
		.object({
			select: StudentSelectSchema.optional(),
			include: StudentIncludeSchema.optional(),
			where: StudentWhereInputSchema.optional(),
			orderBy: z
				.union([
					StudentOrderByWithRelationInputSchema.array(),
					StudentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: StudentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					StudentScalarFieldEnumSchema,
					StudentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const StudentAggregateArgsSchema: z.ZodType<Prisma.StudentAggregateArgs> =
	z
		.object({
			where: StudentWhereInputSchema.optional(),
			orderBy: z
				.union([
					StudentOrderByWithRelationInputSchema.array(),
					StudentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: StudentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const StudentGroupByArgsSchema: z.ZodType<Prisma.StudentGroupByArgs> = z
	.object({
		where: StudentWhereInputSchema.optional(),
		orderBy: z
			.union([
				StudentOrderByWithAggregationInputSchema.array(),
				StudentOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: StudentScalarFieldEnumSchema.array(),
		having: StudentScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const StudentFindUniqueArgsSchema: z.ZodType<Prisma.StudentFindUniqueArgs> =
	z
		.object({
			select: StudentSelectSchema.optional(),
			include: StudentIncludeSchema.optional(),
			where: StudentWhereUniqueInputSchema,
		})
		.strict();

export const StudentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StudentFindUniqueOrThrowArgs> =
	z
		.object({
			select: StudentSelectSchema.optional(),
			include: StudentIncludeSchema.optional(),
			where: StudentWhereUniqueInputSchema,
		})
		.strict();

export const SubjectFindFirstArgsSchema: z.ZodType<Prisma.SubjectFindFirstArgs> =
	z
		.object({
			select: SubjectSelectSchema.optional(),
			include: SubjectIncludeSchema.optional(),
			where: SubjectWhereInputSchema.optional(),
			orderBy: z
				.union([
					SubjectOrderByWithRelationInputSchema.array(),
					SubjectOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SubjectWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					SubjectScalarFieldEnumSchema,
					SubjectScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const SubjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubjectFindFirstOrThrowArgs> =
	z
		.object({
			select: SubjectSelectSchema.optional(),
			include: SubjectIncludeSchema.optional(),
			where: SubjectWhereInputSchema.optional(),
			orderBy: z
				.union([
					SubjectOrderByWithRelationInputSchema.array(),
					SubjectOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SubjectWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					SubjectScalarFieldEnumSchema,
					SubjectScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const SubjectFindManyArgsSchema: z.ZodType<Prisma.SubjectFindManyArgs> =
	z
		.object({
			select: SubjectSelectSchema.optional(),
			include: SubjectIncludeSchema.optional(),
			where: SubjectWhereInputSchema.optional(),
			orderBy: z
				.union([
					SubjectOrderByWithRelationInputSchema.array(),
					SubjectOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SubjectWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					SubjectScalarFieldEnumSchema,
					SubjectScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const SubjectAggregateArgsSchema: z.ZodType<Prisma.SubjectAggregateArgs> =
	z
		.object({
			where: SubjectWhereInputSchema.optional(),
			orderBy: z
				.union([
					SubjectOrderByWithRelationInputSchema.array(),
					SubjectOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SubjectWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const SubjectGroupByArgsSchema: z.ZodType<Prisma.SubjectGroupByArgs> = z
	.object({
		where: SubjectWhereInputSchema.optional(),
		orderBy: z
			.union([
				SubjectOrderByWithAggregationInputSchema.array(),
				SubjectOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: SubjectScalarFieldEnumSchema.array(),
		having: SubjectScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const SubjectFindUniqueArgsSchema: z.ZodType<Prisma.SubjectFindUniqueArgs> =
	z
		.object({
			select: SubjectSelectSchema.optional(),
			include: SubjectIncludeSchema.optional(),
			where: SubjectWhereUniqueInputSchema,
		})
		.strict();

export const SubjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubjectFindUniqueOrThrowArgs> =
	z
		.object({
			select: SubjectSelectSchema.optional(),
			include: SubjectIncludeSchema.optional(),
			where: SubjectWhereUniqueInputSchema,
		})
		.strict();

export const LessonFindFirstArgsSchema: z.ZodType<Prisma.LessonFindFirstArgs> =
	z
		.object({
			select: LessonSelectSchema.optional(),
			include: LessonIncludeSchema.optional(),
			where: LessonWhereInputSchema.optional(),
			orderBy: z
				.union([
					LessonOrderByWithRelationInputSchema.array(),
					LessonOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: LessonWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					LessonScalarFieldEnumSchema,
					LessonScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const LessonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LessonFindFirstOrThrowArgs> =
	z
		.object({
			select: LessonSelectSchema.optional(),
			include: LessonIncludeSchema.optional(),
			where: LessonWhereInputSchema.optional(),
			orderBy: z
				.union([
					LessonOrderByWithRelationInputSchema.array(),
					LessonOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: LessonWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					LessonScalarFieldEnumSchema,
					LessonScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const LessonFindManyArgsSchema: z.ZodType<Prisma.LessonFindManyArgs> = z
	.object({
		select: LessonSelectSchema.optional(),
		include: LessonIncludeSchema.optional(),
		where: LessonWhereInputSchema.optional(),
		orderBy: z
			.union([
				LessonOrderByWithRelationInputSchema.array(),
				LessonOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: LessonWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				LessonScalarFieldEnumSchema,
				LessonScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const LessonAggregateArgsSchema: z.ZodType<Prisma.LessonAggregateArgs> =
	z
		.object({
			where: LessonWhereInputSchema.optional(),
			orderBy: z
				.union([
					LessonOrderByWithRelationInputSchema.array(),
					LessonOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: LessonWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const LessonGroupByArgsSchema: z.ZodType<Prisma.LessonGroupByArgs> = z
	.object({
		where: LessonWhereInputSchema.optional(),
		orderBy: z
			.union([
				LessonOrderByWithAggregationInputSchema.array(),
				LessonOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: LessonScalarFieldEnumSchema.array(),
		having: LessonScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const LessonFindUniqueArgsSchema: z.ZodType<Prisma.LessonFindUniqueArgs> =
	z
		.object({
			select: LessonSelectSchema.optional(),
			include: LessonIncludeSchema.optional(),
			where: LessonWhereUniqueInputSchema,
		})
		.strict();

export const LessonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LessonFindUniqueOrThrowArgs> =
	z
		.object({
			select: LessonSelectSchema.optional(),
			include: LessonIncludeSchema.optional(),
			where: LessonWhereUniqueInputSchema,
		})
		.strict();

export const ScheduleFindFirstArgsSchema: z.ZodType<Prisma.ScheduleFindFirstArgs> =
	z
		.object({
			select: ScheduleSelectSchema.optional(),
			include: ScheduleIncludeSchema.optional(),
			where: ScheduleWhereInputSchema.optional(),
			orderBy: z
				.union([
					ScheduleOrderByWithRelationInputSchema.array(),
					ScheduleOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ScheduleWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ScheduleScalarFieldEnumSchema,
					ScheduleScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ScheduleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ScheduleFindFirstOrThrowArgs> =
	z
		.object({
			select: ScheduleSelectSchema.optional(),
			include: ScheduleIncludeSchema.optional(),
			where: ScheduleWhereInputSchema.optional(),
			orderBy: z
				.union([
					ScheduleOrderByWithRelationInputSchema.array(),
					ScheduleOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ScheduleWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ScheduleScalarFieldEnumSchema,
					ScheduleScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ScheduleFindManyArgsSchema: z.ZodType<Prisma.ScheduleFindManyArgs> =
	z
		.object({
			select: ScheduleSelectSchema.optional(),
			include: ScheduleIncludeSchema.optional(),
			where: ScheduleWhereInputSchema.optional(),
			orderBy: z
				.union([
					ScheduleOrderByWithRelationInputSchema.array(),
					ScheduleOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ScheduleWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					ScheduleScalarFieldEnumSchema,
					ScheduleScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const ScheduleAggregateArgsSchema: z.ZodType<Prisma.ScheduleAggregateArgs> =
	z
		.object({
			where: ScheduleWhereInputSchema.optional(),
			orderBy: z
				.union([
					ScheduleOrderByWithRelationInputSchema.array(),
					ScheduleOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: ScheduleWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const ScheduleGroupByArgsSchema: z.ZodType<Prisma.ScheduleGroupByArgs> =
	z
		.object({
			where: ScheduleWhereInputSchema.optional(),
			orderBy: z
				.union([
					ScheduleOrderByWithAggregationInputSchema.array(),
					ScheduleOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: ScheduleScalarFieldEnumSchema.array(),
			having: ScheduleScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const ScheduleFindUniqueArgsSchema: z.ZodType<Prisma.ScheduleFindUniqueArgs> =
	z
		.object({
			select: ScheduleSelectSchema.optional(),
			include: ScheduleIncludeSchema.optional(),
			where: ScheduleWhereUniqueInputSchema,
		})
		.strict();

export const ScheduleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ScheduleFindUniqueOrThrowArgs> =
	z
		.object({
			select: ScheduleSelectSchema.optional(),
			include: ScheduleIncludeSchema.optional(),
			where: ScheduleWhereUniqueInputSchema,
		})
		.strict();

export const SchoolClassFindFirstArgsSchema: z.ZodType<Prisma.SchoolClassFindFirstArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			where: SchoolClassWhereInputSchema.optional(),
			orderBy: z
				.union([
					SchoolClassOrderByWithRelationInputSchema.array(),
					SchoolClassOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SchoolClassWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					SchoolClassScalarFieldEnumSchema,
					SchoolClassScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SchoolClassFindFirstOrThrowArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			where: SchoolClassWhereInputSchema.optional(),
			orderBy: z
				.union([
					SchoolClassOrderByWithRelationInputSchema.array(),
					SchoolClassOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SchoolClassWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					SchoolClassScalarFieldEnumSchema,
					SchoolClassScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassFindManyArgsSchema: z.ZodType<Prisma.SchoolClassFindManyArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			where: SchoolClassWhereInputSchema.optional(),
			orderBy: z
				.union([
					SchoolClassOrderByWithRelationInputSchema.array(),
					SchoolClassOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SchoolClassWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					SchoolClassScalarFieldEnumSchema,
					SchoolClassScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const SchoolClassAggregateArgsSchema: z.ZodType<Prisma.SchoolClassAggregateArgs> =
	z
		.object({
			where: SchoolClassWhereInputSchema.optional(),
			orderBy: z
				.union([
					SchoolClassOrderByWithRelationInputSchema.array(),
					SchoolClassOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SchoolClassWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const SchoolClassGroupByArgsSchema: z.ZodType<Prisma.SchoolClassGroupByArgs> =
	z
		.object({
			where: SchoolClassWhereInputSchema.optional(),
			orderBy: z
				.union([
					SchoolClassOrderByWithAggregationInputSchema.array(),
					SchoolClassOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: SchoolClassScalarFieldEnumSchema.array(),
			having: SchoolClassScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const SchoolClassFindUniqueArgsSchema: z.ZodType<Prisma.SchoolClassFindUniqueArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			where: SchoolClassWhereUniqueInputSchema,
		})
		.strict();

export const SchoolClassFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SchoolClassFindUniqueOrThrowArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			where: SchoolClassWhereUniqueInputSchema,
		})
		.strict();

export const SchoolFindFirstArgsSchema: z.ZodType<Prisma.SchoolFindFirstArgs> =
	z
		.object({
			select: SchoolSelectSchema.optional(),
			include: SchoolIncludeSchema.optional(),
			where: SchoolWhereInputSchema.optional(),
			orderBy: z
				.union([
					SchoolOrderByWithRelationInputSchema.array(),
					SchoolOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SchoolWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					SchoolScalarFieldEnumSchema,
					SchoolScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const SchoolFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SchoolFindFirstOrThrowArgs> =
	z
		.object({
			select: SchoolSelectSchema.optional(),
			include: SchoolIncludeSchema.optional(),
			where: SchoolWhereInputSchema.optional(),
			orderBy: z
				.union([
					SchoolOrderByWithRelationInputSchema.array(),
					SchoolOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SchoolWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					SchoolScalarFieldEnumSchema,
					SchoolScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const SchoolFindManyArgsSchema: z.ZodType<Prisma.SchoolFindManyArgs> = z
	.object({
		select: SchoolSelectSchema.optional(),
		include: SchoolIncludeSchema.optional(),
		where: SchoolWhereInputSchema.optional(),
		orderBy: z
			.union([
				SchoolOrderByWithRelationInputSchema.array(),
				SchoolOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: SchoolWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				SchoolScalarFieldEnumSchema,
				SchoolScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const SchoolAggregateArgsSchema: z.ZodType<Prisma.SchoolAggregateArgs> =
	z
		.object({
			where: SchoolWhereInputSchema.optional(),
			orderBy: z
				.union([
					SchoolOrderByWithRelationInputSchema.array(),
					SchoolOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: SchoolWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const SchoolGroupByArgsSchema: z.ZodType<Prisma.SchoolGroupByArgs> = z
	.object({
		where: SchoolWhereInputSchema.optional(),
		orderBy: z
			.union([
				SchoolOrderByWithAggregationInputSchema.array(),
				SchoolOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: SchoolScalarFieldEnumSchema.array(),
		having: SchoolScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const SchoolFindUniqueArgsSchema: z.ZodType<Prisma.SchoolFindUniqueArgs> =
	z
		.object({
			select: SchoolSelectSchema.optional(),
			include: SchoolIncludeSchema.optional(),
			where: SchoolWhereUniqueInputSchema,
		})
		.strict();

export const SchoolFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SchoolFindUniqueOrThrowArgs> =
	z
		.object({
			select: SchoolSelectSchema.optional(),
			include: SchoolIncludeSchema.optional(),
			where: SchoolWhereUniqueInputSchema,
		})
		.strict();

export const BuildingFindFirstArgsSchema: z.ZodType<Prisma.BuildingFindFirstArgs> =
	z
		.object({
			select: BuildingSelectSchema.optional(),
			include: BuildingIncludeSchema.optional(),
			where: BuildingWhereInputSchema.optional(),
			orderBy: z
				.union([
					BuildingOrderByWithRelationInputSchema.array(),
					BuildingOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: BuildingWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					BuildingScalarFieldEnumSchema,
					BuildingScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const BuildingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BuildingFindFirstOrThrowArgs> =
	z
		.object({
			select: BuildingSelectSchema.optional(),
			include: BuildingIncludeSchema.optional(),
			where: BuildingWhereInputSchema.optional(),
			orderBy: z
				.union([
					BuildingOrderByWithRelationInputSchema.array(),
					BuildingOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: BuildingWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					BuildingScalarFieldEnumSchema,
					BuildingScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const BuildingFindManyArgsSchema: z.ZodType<Prisma.BuildingFindManyArgs> =
	z
		.object({
			select: BuildingSelectSchema.optional(),
			include: BuildingIncludeSchema.optional(),
			where: BuildingWhereInputSchema.optional(),
			orderBy: z
				.union([
					BuildingOrderByWithRelationInputSchema.array(),
					BuildingOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: BuildingWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					BuildingScalarFieldEnumSchema,
					BuildingScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const BuildingAggregateArgsSchema: z.ZodType<Prisma.BuildingAggregateArgs> =
	z
		.object({
			where: BuildingWhereInputSchema.optional(),
			orderBy: z
				.union([
					BuildingOrderByWithRelationInputSchema.array(),
					BuildingOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: BuildingWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const BuildingGroupByArgsSchema: z.ZodType<Prisma.BuildingGroupByArgs> =
	z
		.object({
			where: BuildingWhereInputSchema.optional(),
			orderBy: z
				.union([
					BuildingOrderByWithAggregationInputSchema.array(),
					BuildingOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: BuildingScalarFieldEnumSchema.array(),
			having: BuildingScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const BuildingFindUniqueArgsSchema: z.ZodType<Prisma.BuildingFindUniqueArgs> =
	z
		.object({
			select: BuildingSelectSchema.optional(),
			include: BuildingIncludeSchema.optional(),
			where: BuildingWhereUniqueInputSchema,
		})
		.strict();

export const BuildingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BuildingFindUniqueOrThrowArgs> =
	z
		.object({
			select: BuildingSelectSchema.optional(),
			include: BuildingIncludeSchema.optional(),
			where: BuildingWhereUniqueInputSchema,
		})
		.strict();

export const FloorFindFirstArgsSchema: z.ZodType<Prisma.FloorFindFirstArgs> = z
	.object({
		select: FloorSelectSchema.optional(),
		include: FloorIncludeSchema.optional(),
		where: FloorWhereInputSchema.optional(),
		orderBy: z
			.union([
				FloorOrderByWithRelationInputSchema.array(),
				FloorOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: FloorWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				FloorScalarFieldEnumSchema,
				FloorScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const FloorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FloorFindFirstOrThrowArgs> =
	z
		.object({
			select: FloorSelectSchema.optional(),
			include: FloorIncludeSchema.optional(),
			where: FloorWhereInputSchema.optional(),
			orderBy: z
				.union([
					FloorOrderByWithRelationInputSchema.array(),
					FloorOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: FloorWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					FloorScalarFieldEnumSchema,
					FloorScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const FloorFindManyArgsSchema: z.ZodType<Prisma.FloorFindManyArgs> = z
	.object({
		select: FloorSelectSchema.optional(),
		include: FloorIncludeSchema.optional(),
		where: FloorWhereInputSchema.optional(),
		orderBy: z
			.union([
				FloorOrderByWithRelationInputSchema.array(),
				FloorOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: FloorWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				FloorScalarFieldEnumSchema,
				FloorScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const FloorAggregateArgsSchema: z.ZodType<Prisma.FloorAggregateArgs> = z
	.object({
		where: FloorWhereInputSchema.optional(),
		orderBy: z
			.union([
				FloorOrderByWithRelationInputSchema.array(),
				FloorOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: FloorWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const FloorGroupByArgsSchema: z.ZodType<Prisma.FloorGroupByArgs> = z
	.object({
		where: FloorWhereInputSchema.optional(),
		orderBy: z
			.union([
				FloorOrderByWithAggregationInputSchema.array(),
				FloorOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: FloorScalarFieldEnumSchema.array(),
		having: FloorScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const FloorFindUniqueArgsSchema: z.ZodType<Prisma.FloorFindUniqueArgs> =
	z
		.object({
			select: FloorSelectSchema.optional(),
			include: FloorIncludeSchema.optional(),
			where: FloorWhereUniqueInputSchema,
		})
		.strict();

export const FloorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FloorFindUniqueOrThrowArgs> =
	z
		.object({
			select: FloorSelectSchema.optional(),
			include: FloorIncludeSchema.optional(),
			where: FloorWhereUniqueInputSchema,
		})
		.strict();

export const RoomFindFirstArgsSchema: z.ZodType<Prisma.RoomFindFirstArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereInputSchema.optional(),
		orderBy: z
			.union([
				RoomOrderByWithRelationInputSchema.array(),
				RoomOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: RoomWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				RoomScalarFieldEnumSchema,
				RoomScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const RoomFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoomFindFirstOrThrowArgs> =
	z
		.object({
			select: RoomSelectSchema.optional(),
			include: RoomIncludeSchema.optional(),
			where: RoomWhereInputSchema.optional(),
			orderBy: z
				.union([
					RoomOrderByWithRelationInputSchema.array(),
					RoomOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: RoomWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					RoomScalarFieldEnumSchema,
					RoomScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const RoomFindManyArgsSchema: z.ZodType<Prisma.RoomFindManyArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereInputSchema.optional(),
		orderBy: z
			.union([
				RoomOrderByWithRelationInputSchema.array(),
				RoomOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: RoomWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([
				RoomScalarFieldEnumSchema,
				RoomScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();

export const RoomAggregateArgsSchema: z.ZodType<Prisma.RoomAggregateArgs> = z
	.object({
		where: RoomWhereInputSchema.optional(),
		orderBy: z
			.union([
				RoomOrderByWithRelationInputSchema.array(),
				RoomOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: RoomWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const RoomGroupByArgsSchema: z.ZodType<Prisma.RoomGroupByArgs> = z
	.object({
		where: RoomWhereInputSchema.optional(),
		orderBy: z
			.union([
				RoomOrderByWithAggregationInputSchema.array(),
				RoomOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: RoomScalarFieldEnumSchema.array(),
		having: RoomScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const RoomFindUniqueArgsSchema: z.ZodType<Prisma.RoomFindUniqueArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereUniqueInputSchema,
	})
	.strict();

export const RoomFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoomFindUniqueOrThrowArgs> =
	z
		.object({
			select: RoomSelectSchema.optional(),
			include: RoomIncludeSchema.optional(),
			where: RoomWhereUniqueInputSchema,
		})
		.strict();

export const TeacherCreateArgsSchema: z.ZodType<Prisma.TeacherCreateArgs> = z
	.object({
		select: TeacherSelectSchema.optional(),
		include: TeacherIncludeSchema.optional(),
		data: z.union([
			TeacherCreateInputSchema,
			TeacherUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const TeacherUpsertArgsSchema: z.ZodType<Prisma.TeacherUpsertArgs> = z
	.object({
		select: TeacherSelectSchema.optional(),
		include: TeacherIncludeSchema.optional(),
		where: TeacherWhereUniqueInputSchema,
		create: z.union([
			TeacherCreateInputSchema,
			TeacherUncheckedCreateInputSchema,
		]),
		update: z.union([
			TeacherUpdateInputSchema,
			TeacherUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const TeacherCreateManyArgsSchema: z.ZodType<Prisma.TeacherCreateManyArgs> =
	z
		.object({
			data: z.union([
				TeacherCreateManyInputSchema,
				TeacherCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const TeacherDeleteArgsSchema: z.ZodType<Prisma.TeacherDeleteArgs> = z
	.object({
		select: TeacherSelectSchema.optional(),
		include: TeacherIncludeSchema.optional(),
		where: TeacherWhereUniqueInputSchema,
	})
	.strict();

export const TeacherUpdateArgsSchema: z.ZodType<Prisma.TeacherUpdateArgs> = z
	.object({
		select: TeacherSelectSchema.optional(),
		include: TeacherIncludeSchema.optional(),
		data: z.union([
			TeacherUpdateInputSchema,
			TeacherUncheckedUpdateInputSchema,
		]),
		where: TeacherWhereUniqueInputSchema,
	})
	.strict();

export const TeacherUpdateManyArgsSchema: z.ZodType<Prisma.TeacherUpdateManyArgs> =
	z
		.object({
			data: z.union([
				TeacherUpdateManyMutationInputSchema,
				TeacherUncheckedUpdateManyInputSchema,
			]),
			where: TeacherWhereInputSchema.optional(),
		})
		.strict();

export const TeacherDeleteManyArgsSchema: z.ZodType<Prisma.TeacherDeleteManyArgs> =
	z
		.object({
			where: TeacherWhereInputSchema.optional(),
		})
		.strict();

export const StudentCreateArgsSchema: z.ZodType<Prisma.StudentCreateArgs> = z
	.object({
		select: StudentSelectSchema.optional(),
		include: StudentIncludeSchema.optional(),
		data: z.union([
			StudentCreateInputSchema,
			StudentUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const StudentUpsertArgsSchema: z.ZodType<Prisma.StudentUpsertArgs> = z
	.object({
		select: StudentSelectSchema.optional(),
		include: StudentIncludeSchema.optional(),
		where: StudentWhereUniqueInputSchema,
		create: z.union([
			StudentCreateInputSchema,
			StudentUncheckedCreateInputSchema,
		]),
		update: z.union([
			StudentUpdateInputSchema,
			StudentUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const StudentCreateManyArgsSchema: z.ZodType<Prisma.StudentCreateManyArgs> =
	z
		.object({
			data: z.union([
				StudentCreateManyInputSchema,
				StudentCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const StudentDeleteArgsSchema: z.ZodType<Prisma.StudentDeleteArgs> = z
	.object({
		select: StudentSelectSchema.optional(),
		include: StudentIncludeSchema.optional(),
		where: StudentWhereUniqueInputSchema,
	})
	.strict();

export const StudentUpdateArgsSchema: z.ZodType<Prisma.StudentUpdateArgs> = z
	.object({
		select: StudentSelectSchema.optional(),
		include: StudentIncludeSchema.optional(),
		data: z.union([
			StudentUpdateInputSchema,
			StudentUncheckedUpdateInputSchema,
		]),
		where: StudentWhereUniqueInputSchema,
	})
	.strict();

export const StudentUpdateManyArgsSchema: z.ZodType<Prisma.StudentUpdateManyArgs> =
	z
		.object({
			data: z.union([
				StudentUpdateManyMutationInputSchema,
				StudentUncheckedUpdateManyInputSchema,
			]),
			where: StudentWhereInputSchema.optional(),
		})
		.strict();

export const StudentDeleteManyArgsSchema: z.ZodType<Prisma.StudentDeleteManyArgs> =
	z
		.object({
			where: StudentWhereInputSchema.optional(),
		})
		.strict();

export const SubjectCreateArgsSchema: z.ZodType<Prisma.SubjectCreateArgs> = z
	.object({
		select: SubjectSelectSchema.optional(),
		include: SubjectIncludeSchema.optional(),
		data: z.union([
			SubjectCreateInputSchema,
			SubjectUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const SubjectUpsertArgsSchema: z.ZodType<Prisma.SubjectUpsertArgs> = z
	.object({
		select: SubjectSelectSchema.optional(),
		include: SubjectIncludeSchema.optional(),
		where: SubjectWhereUniqueInputSchema,
		create: z.union([
			SubjectCreateInputSchema,
			SubjectUncheckedCreateInputSchema,
		]),
		update: z.union([
			SubjectUpdateInputSchema,
			SubjectUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const SubjectCreateManyArgsSchema: z.ZodType<Prisma.SubjectCreateManyArgs> =
	z
		.object({
			data: z.union([
				SubjectCreateManyInputSchema,
				SubjectCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const SubjectDeleteArgsSchema: z.ZodType<Prisma.SubjectDeleteArgs> = z
	.object({
		select: SubjectSelectSchema.optional(),
		include: SubjectIncludeSchema.optional(),
		where: SubjectWhereUniqueInputSchema,
	})
	.strict();

export const SubjectUpdateArgsSchema: z.ZodType<Prisma.SubjectUpdateArgs> = z
	.object({
		select: SubjectSelectSchema.optional(),
		include: SubjectIncludeSchema.optional(),
		data: z.union([
			SubjectUpdateInputSchema,
			SubjectUncheckedUpdateInputSchema,
		]),
		where: SubjectWhereUniqueInputSchema,
	})
	.strict();

export const SubjectUpdateManyArgsSchema: z.ZodType<Prisma.SubjectUpdateManyArgs> =
	z
		.object({
			data: z.union([
				SubjectUpdateManyMutationInputSchema,
				SubjectUncheckedUpdateManyInputSchema,
			]),
			where: SubjectWhereInputSchema.optional(),
		})
		.strict();

export const SubjectDeleteManyArgsSchema: z.ZodType<Prisma.SubjectDeleteManyArgs> =
	z
		.object({
			where: SubjectWhereInputSchema.optional(),
		})
		.strict();

export const LessonCreateArgsSchema: z.ZodType<Prisma.LessonCreateArgs> = z
	.object({
		select: LessonSelectSchema.optional(),
		include: LessonIncludeSchema.optional(),
		data: z.union([
			LessonCreateInputSchema,
			LessonUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const LessonUpsertArgsSchema: z.ZodType<Prisma.LessonUpsertArgs> = z
	.object({
		select: LessonSelectSchema.optional(),
		include: LessonIncludeSchema.optional(),
		where: LessonWhereUniqueInputSchema,
		create: z.union([
			LessonCreateInputSchema,
			LessonUncheckedCreateInputSchema,
		]),
		update: z.union([
			LessonUpdateInputSchema,
			LessonUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const LessonCreateManyArgsSchema: z.ZodType<Prisma.LessonCreateManyArgs> =
	z
		.object({
			data: z.union([
				LessonCreateManyInputSchema,
				LessonCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const LessonDeleteArgsSchema: z.ZodType<Prisma.LessonDeleteArgs> = z
	.object({
		select: LessonSelectSchema.optional(),
		include: LessonIncludeSchema.optional(),
		where: LessonWhereUniqueInputSchema,
	})
	.strict();

export const LessonUpdateArgsSchema: z.ZodType<Prisma.LessonUpdateArgs> = z
	.object({
		select: LessonSelectSchema.optional(),
		include: LessonIncludeSchema.optional(),
		data: z.union([
			LessonUpdateInputSchema,
			LessonUncheckedUpdateInputSchema,
		]),
		where: LessonWhereUniqueInputSchema,
	})
	.strict();

export const LessonUpdateManyArgsSchema: z.ZodType<Prisma.LessonUpdateManyArgs> =
	z
		.object({
			data: z.union([
				LessonUpdateManyMutationInputSchema,
				LessonUncheckedUpdateManyInputSchema,
			]),
			where: LessonWhereInputSchema.optional(),
		})
		.strict();

export const LessonDeleteManyArgsSchema: z.ZodType<Prisma.LessonDeleteManyArgs> =
	z
		.object({
			where: LessonWhereInputSchema.optional(),
		})
		.strict();

export const ScheduleCreateArgsSchema: z.ZodType<Prisma.ScheduleCreateArgs> = z
	.object({
		select: ScheduleSelectSchema.optional(),
		include: ScheduleIncludeSchema.optional(),
		data: z.union([
			ScheduleCreateInputSchema,
			ScheduleUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const ScheduleUpsertArgsSchema: z.ZodType<Prisma.ScheduleUpsertArgs> = z
	.object({
		select: ScheduleSelectSchema.optional(),
		include: ScheduleIncludeSchema.optional(),
		where: ScheduleWhereUniqueInputSchema,
		create: z.union([
			ScheduleCreateInputSchema,
			ScheduleUncheckedCreateInputSchema,
		]),
		update: z.union([
			ScheduleUpdateInputSchema,
			ScheduleUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const ScheduleCreateManyArgsSchema: z.ZodType<Prisma.ScheduleCreateManyArgs> =
	z
		.object({
			data: z.union([
				ScheduleCreateManyInputSchema,
				ScheduleCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const ScheduleDeleteArgsSchema: z.ZodType<Prisma.ScheduleDeleteArgs> = z
	.object({
		select: ScheduleSelectSchema.optional(),
		include: ScheduleIncludeSchema.optional(),
		where: ScheduleWhereUniqueInputSchema,
	})
	.strict();

export const ScheduleUpdateArgsSchema: z.ZodType<Prisma.ScheduleUpdateArgs> = z
	.object({
		select: ScheduleSelectSchema.optional(),
		include: ScheduleIncludeSchema.optional(),
		data: z.union([
			ScheduleUpdateInputSchema,
			ScheduleUncheckedUpdateInputSchema,
		]),
		where: ScheduleWhereUniqueInputSchema,
	})
	.strict();

export const ScheduleUpdateManyArgsSchema: z.ZodType<Prisma.ScheduleUpdateManyArgs> =
	z
		.object({
			data: z.union([
				ScheduleUpdateManyMutationInputSchema,
				ScheduleUncheckedUpdateManyInputSchema,
			]),
			where: ScheduleWhereInputSchema.optional(),
		})
		.strict();

export const ScheduleDeleteManyArgsSchema: z.ZodType<Prisma.ScheduleDeleteManyArgs> =
	z
		.object({
			where: ScheduleWhereInputSchema.optional(),
		})
		.strict();

export const SchoolClassCreateArgsSchema: z.ZodType<Prisma.SchoolClassCreateArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			data: z.union([
				SchoolClassCreateInputSchema,
				SchoolClassUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const SchoolClassUpsertArgsSchema: z.ZodType<Prisma.SchoolClassUpsertArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			where: SchoolClassWhereUniqueInputSchema,
			create: z.union([
				SchoolClassCreateInputSchema,
				SchoolClassUncheckedCreateInputSchema,
			]),
			update: z.union([
				SchoolClassUpdateInputSchema,
				SchoolClassUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const SchoolClassCreateManyArgsSchema: z.ZodType<Prisma.SchoolClassCreateManyArgs> =
	z
		.object({
			data: z.union([
				SchoolClassCreateManyInputSchema,
				SchoolClassCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const SchoolClassDeleteArgsSchema: z.ZodType<Prisma.SchoolClassDeleteArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			where: SchoolClassWhereUniqueInputSchema,
		})
		.strict();

export const SchoolClassUpdateArgsSchema: z.ZodType<Prisma.SchoolClassUpdateArgs> =
	z
		.object({
			select: SchoolClassSelectSchema.optional(),
			include: SchoolClassIncludeSchema.optional(),
			data: z.union([
				SchoolClassUpdateInputSchema,
				SchoolClassUncheckedUpdateInputSchema,
			]),
			where: SchoolClassWhereUniqueInputSchema,
		})
		.strict();

export const SchoolClassUpdateManyArgsSchema: z.ZodType<Prisma.SchoolClassUpdateManyArgs> =
	z
		.object({
			data: z.union([
				SchoolClassUpdateManyMutationInputSchema,
				SchoolClassUncheckedUpdateManyInputSchema,
			]),
			where: SchoolClassWhereInputSchema.optional(),
		})
		.strict();

export const SchoolClassDeleteManyArgsSchema: z.ZodType<Prisma.SchoolClassDeleteManyArgs> =
	z
		.object({
			where: SchoolClassWhereInputSchema.optional(),
		})
		.strict();

export const SchoolCreateArgsSchema: z.ZodType<Prisma.SchoolCreateArgs> = z
	.object({
		select: SchoolSelectSchema.optional(),
		include: SchoolIncludeSchema.optional(),
		data: z.union([
			SchoolCreateInputSchema,
			SchoolUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const SchoolUpsertArgsSchema: z.ZodType<Prisma.SchoolUpsertArgs> = z
	.object({
		select: SchoolSelectSchema.optional(),
		include: SchoolIncludeSchema.optional(),
		where: SchoolWhereUniqueInputSchema,
		create: z.union([
			SchoolCreateInputSchema,
			SchoolUncheckedCreateInputSchema,
		]),
		update: z.union([
			SchoolUpdateInputSchema,
			SchoolUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const SchoolCreateManyArgsSchema: z.ZodType<Prisma.SchoolCreateManyArgs> =
	z
		.object({
			data: z.union([
				SchoolCreateManyInputSchema,
				SchoolCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const SchoolDeleteArgsSchema: z.ZodType<Prisma.SchoolDeleteArgs> = z
	.object({
		select: SchoolSelectSchema.optional(),
		include: SchoolIncludeSchema.optional(),
		where: SchoolWhereUniqueInputSchema,
	})
	.strict();

export const SchoolUpdateArgsSchema: z.ZodType<Prisma.SchoolUpdateArgs> = z
	.object({
		select: SchoolSelectSchema.optional(),
		include: SchoolIncludeSchema.optional(),
		data: z.union([
			SchoolUpdateInputSchema,
			SchoolUncheckedUpdateInputSchema,
		]),
		where: SchoolWhereUniqueInputSchema,
	})
	.strict();

export const SchoolUpdateManyArgsSchema: z.ZodType<Prisma.SchoolUpdateManyArgs> =
	z
		.object({
			data: z.union([
				SchoolUpdateManyMutationInputSchema,
				SchoolUncheckedUpdateManyInputSchema,
			]),
			where: SchoolWhereInputSchema.optional(),
		})
		.strict();

export const SchoolDeleteManyArgsSchema: z.ZodType<Prisma.SchoolDeleteManyArgs> =
	z
		.object({
			where: SchoolWhereInputSchema.optional(),
		})
		.strict();

export const BuildingCreateArgsSchema: z.ZodType<Prisma.BuildingCreateArgs> = z
	.object({
		select: BuildingSelectSchema.optional(),
		include: BuildingIncludeSchema.optional(),
		data: z.union([
			BuildingCreateInputSchema,
			BuildingUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const BuildingUpsertArgsSchema: z.ZodType<Prisma.BuildingUpsertArgs> = z
	.object({
		select: BuildingSelectSchema.optional(),
		include: BuildingIncludeSchema.optional(),
		where: BuildingWhereUniqueInputSchema,
		create: z.union([
			BuildingCreateInputSchema,
			BuildingUncheckedCreateInputSchema,
		]),
		update: z.union([
			BuildingUpdateInputSchema,
			BuildingUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const BuildingCreateManyArgsSchema: z.ZodType<Prisma.BuildingCreateManyArgs> =
	z
		.object({
			data: z.union([
				BuildingCreateManyInputSchema,
				BuildingCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const BuildingDeleteArgsSchema: z.ZodType<Prisma.BuildingDeleteArgs> = z
	.object({
		select: BuildingSelectSchema.optional(),
		include: BuildingIncludeSchema.optional(),
		where: BuildingWhereUniqueInputSchema,
	})
	.strict();

export const BuildingUpdateArgsSchema: z.ZodType<Prisma.BuildingUpdateArgs> = z
	.object({
		select: BuildingSelectSchema.optional(),
		include: BuildingIncludeSchema.optional(),
		data: z.union([
			BuildingUpdateInputSchema,
			BuildingUncheckedUpdateInputSchema,
		]),
		where: BuildingWhereUniqueInputSchema,
	})
	.strict();

export const BuildingUpdateManyArgsSchema: z.ZodType<Prisma.BuildingUpdateManyArgs> =
	z
		.object({
			data: z.union([
				BuildingUpdateManyMutationInputSchema,
				BuildingUncheckedUpdateManyInputSchema,
			]),
			where: BuildingWhereInputSchema.optional(),
		})
		.strict();

export const BuildingDeleteManyArgsSchema: z.ZodType<Prisma.BuildingDeleteManyArgs> =
	z
		.object({
			where: BuildingWhereInputSchema.optional(),
		})
		.strict();

export const FloorCreateArgsSchema: z.ZodType<Prisma.FloorCreateArgs> = z
	.object({
		select: FloorSelectSchema.optional(),
		include: FloorIncludeSchema.optional(),
		data: z.union([
			FloorCreateInputSchema,
			FloorUncheckedCreateInputSchema,
		]),
	})
	.strict();

export const FloorUpsertArgsSchema: z.ZodType<Prisma.FloorUpsertArgs> = z
	.object({
		select: FloorSelectSchema.optional(),
		include: FloorIncludeSchema.optional(),
		where: FloorWhereUniqueInputSchema,
		create: z.union([
			FloorCreateInputSchema,
			FloorUncheckedCreateInputSchema,
		]),
		update: z.union([
			FloorUpdateInputSchema,
			FloorUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const FloorCreateManyArgsSchema: z.ZodType<Prisma.FloorCreateManyArgs> =
	z
		.object({
			data: z.union([
				FloorCreateManyInputSchema,
				FloorCreateManyInputSchema.array(),
			]),
		})
		.strict();

export const FloorDeleteArgsSchema: z.ZodType<Prisma.FloorDeleteArgs> = z
	.object({
		select: FloorSelectSchema.optional(),
		include: FloorIncludeSchema.optional(),
		where: FloorWhereUniqueInputSchema,
	})
	.strict();

export const FloorUpdateArgsSchema: z.ZodType<Prisma.FloorUpdateArgs> = z
	.object({
		select: FloorSelectSchema.optional(),
		include: FloorIncludeSchema.optional(),
		data: z.union([
			FloorUpdateInputSchema,
			FloorUncheckedUpdateInputSchema,
		]),
		where: FloorWhereUniqueInputSchema,
	})
	.strict();

export const FloorUpdateManyArgsSchema: z.ZodType<Prisma.FloorUpdateManyArgs> =
	z
		.object({
			data: z.union([
				FloorUpdateManyMutationInputSchema,
				FloorUncheckedUpdateManyInputSchema,
			]),
			where: FloorWhereInputSchema.optional(),
		})
		.strict();

export const FloorDeleteManyArgsSchema: z.ZodType<Prisma.FloorDeleteManyArgs> =
	z
		.object({
			where: FloorWhereInputSchema.optional(),
		})
		.strict();

export const RoomCreateArgsSchema: z.ZodType<Prisma.RoomCreateArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		data: z.union([RoomCreateInputSchema, RoomUncheckedCreateInputSchema]),
	})
	.strict();

export const RoomUpsertArgsSchema: z.ZodType<Prisma.RoomUpsertArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereUniqueInputSchema,
		create: z.union([
			RoomCreateInputSchema,
			RoomUncheckedCreateInputSchema,
		]),
		update: z.union([
			RoomUpdateInputSchema,
			RoomUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const RoomCreateManyArgsSchema: z.ZodType<Prisma.RoomCreateManyArgs> = z
	.object({
		data: z.union([
			RoomCreateManyInputSchema,
			RoomCreateManyInputSchema.array(),
		]),
	})
	.strict();

export const RoomDeleteArgsSchema: z.ZodType<Prisma.RoomDeleteArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		where: RoomWhereUniqueInputSchema,
	})
	.strict();

export const RoomUpdateArgsSchema: z.ZodType<Prisma.RoomUpdateArgs> = z
	.object({
		select: RoomSelectSchema.optional(),
		include: RoomIncludeSchema.optional(),
		data: z.union([RoomUpdateInputSchema, RoomUncheckedUpdateInputSchema]),
		where: RoomWhereUniqueInputSchema,
	})
	.strict();

export const RoomUpdateManyArgsSchema: z.ZodType<Prisma.RoomUpdateManyArgs> = z
	.object({
		data: z.union([
			RoomUpdateManyMutationInputSchema,
			RoomUncheckedUpdateManyInputSchema,
		]),
		where: RoomWhereInputSchema.optional(),
	})
	.strict();

export const RoomDeleteManyArgsSchema: z.ZodType<Prisma.RoomDeleteManyArgs> = z
	.object({
		where: RoomWhereInputSchema.optional(),
	})
	.strict();
