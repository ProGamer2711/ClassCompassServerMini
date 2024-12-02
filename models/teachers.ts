import type { Teacher } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "../config/db";

const teachersSchema = new Schema<Teacher>(
	"teacher",
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
		subjectIds: {
			type: "string[]",
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

export const teachersRepository = new Repository<Teacher>(
	teachersSchema,
	redisClient
);
