import type { School } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "../config/db";

const schoolsSchema = new Schema<School>(
	"school",
	{
		id: {
			type: "string",
		},
		name: {
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

export const schoolsRepository = new Repository<School>(
	schoolsSchema,
	redisClient
);
