import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	BuildingCreateInputSchema,
	BuildingWhereInputSchema,
	BuildingWhereUniqueInputSchema,
	BuildingUpdateInputSchema,
} from "../prisma/generated/zod";
import type { Building } from "../types/interfaces";

import { prismaClient } from "..";

async function createBuilding(
	building: Prisma.BuildingCreateInput
): Promise<Building | { error: any }> {
	try {
		BuildingCreateInputSchema.parse(building);

		const newBuilding = await prismaClient.building.create({
			data: building,
		});

		return newBuilding;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Сградата вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getBuildings(
	where: Prisma.BuildingWhereInput = {}
): Promise<Building[] | { error: any }> {
	try {
		BuildingWhereInputSchema.parse(where);

		const buildings = await prismaClient.building.findMany({
			where,
		});

		return buildings;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateBuilding(
	where: Prisma.BuildingWhereUniqueInput,
	data: Prisma.BuildingUpdateInput
): Promise<Building | { error: any }> {
	try {
		BuildingWhereUniqueInputSchema.parse(where);
		BuildingUpdateInputSchema.parse(data);

		const building = await prismaClient.building.update({
			where,
			data,
		});

		return building;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Сградата не беше намерена." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteBuilding(
	where: Prisma.BuildingWhereUniqueInput
): Promise<Building | { error: any }> {
	try {
		BuildingWhereUniqueInputSchema.parse(where);

		const building = await prismaClient.building.delete({
			where,
		});

		return building;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Сградата не беше намерена." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createBuilding, getBuildings, updateBuilding, deleteBuilding };
