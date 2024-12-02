import type { Subject } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "..";

const subjectsSchema = new Schema<Subject>(
	"subject",
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
		teacherIds: {
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

export const subjectsRepository = new Repository<Subject>(
	subjectsSchema,
	redisClient
);
