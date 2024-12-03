import type { Room } from "@prisma/client";
import { Schema, Repository } from "redis-om";

import { redisClient } from "../config/db";

const roomsSchema = new Schema<Room>(
	"room",
	{
		id: {
			type: "string",
		},
		name: {
			type: "string",
		},
		floorId: {
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

export const roomsRepository = new Repository<Room>(roomsSchema, redisClient);
