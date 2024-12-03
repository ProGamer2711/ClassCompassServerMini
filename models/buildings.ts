import type { Building } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "../config/db";

const buildingsSchema = new Schema<Building>(
	"building",
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

export const buildingsRepository = new Repository<Building>(
	buildingsSchema,
	redisClient
);
