import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	SchoolClassCreateInputSchema,
	SchoolClassWhereInputSchema,
	SchoolClassWhereUniqueInputSchema,
	SchoolClassUpdateInputSchema,
} from "../prisma/generated/zod";
import type { SchoolClass } from "../types/interfaces";

import { prismaClient } from "..";

async function createSchoolClass(
	schoolClass: Prisma.SchoolClassCreateInput
): Promise<SchoolClass | { error: any }> {
	try {
		SchoolClassCreateInputSchema.parse(schoolClass);

		const newSchoolClass = await prismaClient.schoolClass.create({
			data: schoolClass,
		});

		return newSchoolClass;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Класът вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getSchoolClassеs(
	where: Prisma.SchoolClassWhereInput = {}
): Promise<SchoolClass[] | { error: any }> {
	try {
		SchoolClassWhereInputSchema.parse(where);

		const schoolClasss = await prismaClient.schoolClass.findMany({ where });

		return schoolClasss;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateSchoolClass(
	where: Prisma.SchoolClassWhereUniqueInput,
	data: Prisma.SchoolClassUpdateInput
): Promise<SchoolClass | { error: any }> {
	try {
		SchoolClassWhereUniqueInputSchema.parse(where);
		SchoolClassUpdateInputSchema.parse(data);

		const schoolClass = await prismaClient.schoolClass.update({
			where,
			data,
		});

		return schoolClass;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Класът не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteSchoolClass(
	where: Prisma.SchoolClassWhereUniqueInput
): Promise<SchoolClass | { error: any }> {
	try {
		SchoolClassWhereUniqueInputSchema.parse(where);

		const schoolClass = await prismaClient.schoolClass.delete({
			where,
		});

		return schoolClass;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Класът не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export {
	createSchoolClass,
	getSchoolClassеs,
	updateSchoolClass,
	deleteSchoolClass,
};
