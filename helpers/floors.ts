import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	FloorCreateInputSchema,
	FloorWhereInputSchema,
	FloorWhereUniqueInputSchema,
	FloorUpdateInputSchema,
} from "../prisma/generated/zod";
import type { Floor } from "../types/interfaces";

import { prismaClient } from "..";

async function createFloor(
	floor: Prisma.FloorCreateInput
): Promise<Floor | { error: any }> {
	try {
		FloorCreateInputSchema.parse(floor);

		const newFloor = await prismaClient.floor.create({
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

async function getFloors(
	where: Prisma.FloorWhereInput = {}
): Promise<Floor[] | { error: any }> {
	try {
		FloorWhereInputSchema.parse(where);

		const floors = await prismaClient.floor.findMany({
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
): Promise<Floor | { error: any }> {
	try {
		FloorWhereUniqueInputSchema.parse(where);
		FloorUpdateInputSchema.parse(data);

		const floor = await prismaClient.floor.update({
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

async function deleteFloor(
	where: Prisma.FloorWhereUniqueInput
): Promise<Floor | { error: any }> {
	try {
		FloorWhereUniqueInputSchema.parse(where);

		const floor = await prismaClient.floor.delete({
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
