import type { Lesson } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "../config/db";

const lessonsSchema = new Schema<Lesson>(
	"lesson",
	{
		id: {
			type: "string",
		},
		lessonNumber: {
			type: "number",
		},
		startTime: {
			type: "date",
		},
		endTime: {
			type: "date",
		},
		lessonWeeks: {
			type: "string",
		},
		roomId: {
			type: "string",
		},
		teacherId: {
			type: "string",
		},
		subjectId: {
			type: "string",
		},
		scheduleId: {
			type: "string",
		},
		createdAt: {
			type: "date",
		},
		updatedAt: {
			type: "date",
		},
	},
	{
		dataStructure: "JSON",
	}
);

export const lessonsRepository = new Repository<Lesson>(
	lessonsSchema,
	redisClient
);
