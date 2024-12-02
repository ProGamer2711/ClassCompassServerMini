import type { Floor } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "../config/db";

const floorsSchema = new Schema<Floor>(
	"floor",
	{
		id: {
			type: "string",
		},
		number: {
			type: "number",
		},
		description: {
			type: "string",
		},
		planFilename: {
			type: "string",
		},
		maskFilename: {
			type: "string",
		},
		buildingId: {
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

export const floorsRepository = new Repository<Floor>(
	floorsSchema,
	redisClient
);
