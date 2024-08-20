import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	FloorCreateInputSchema,
	FloorWhereInputSchema,
	FloorWhereUniqueInputSchema,
	FloorUpdateInputSchema,
} from "../prisma/generated/zod";

import { client } from "..";

async function createFloor(floor: Prisma.FloorCreateInput) {
	try {
		FloorCreateInputSchema.parse(floor);

		const newFloor = await client.floor.create({
			data: floor,
		});

		return newFloor;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Етажът вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getFloors(where: Prisma.FloorWhereInput = {}) {
	try {
		FloorWhereInputSchema.parse(where);

		const floors = await client.floor.findMany({
			where,
		});

		return floors;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateFloor(
	where: Prisma.FloorWhereUniqueInput,
	data: Prisma.FloorUpdateInput
) {
	try {
		FloorWhereUniqueInputSchema.parse(where);
		FloorUpdateInputSchema.parse(data);

		const floor = await client.floor.update({
			where,
			data,
		});

		return floor;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Етажът не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteFloor(where: Prisma.FloorWhereUniqueInput) {
	try {
		FloorWhereUniqueInputSchema.parse(where);

		const floor = await client.floor.delete({
			where,
		});

		return floor;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Етажът не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createFloor, getFloors, updateFloor, deleteFloor };
