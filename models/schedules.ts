import type { Schedule } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "..";

const schedulesSchema = new Schema<Schedule>(
	"schedule",
	{
		id: {
			type: "string",
		},
		day: {
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

export const schedulesRepository = new Repository<Schedule>(
	schedulesSchema,
	redisClient
);
