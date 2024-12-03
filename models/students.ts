import type { Student } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "../config/db";

const studentsSchema = new Schema<Student>(
	"student",
	{
		id: {
			type: "string",
		},
		name: {
			type: "string",
		},
		classId: {
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

export const studentsRepository = new Repository<Student>(
	studentsSchema,
	redisClient
);
