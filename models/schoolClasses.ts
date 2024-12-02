import type { SchoolClass } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "../config/db";

const schoolClassesSchema = new Schema<SchoolClass>(
	"schoolClass",
	{
		id: {
			type: "string",
		},
		name: {
			type: "string",
		},
		schoolId: {
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

export const schoolClassesRepository = new Repository<SchoolClass>(
	schoolClassesSchema,
	redisClient
);
