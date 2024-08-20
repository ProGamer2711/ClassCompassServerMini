import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	SchoolClassCreateInputSchema,
	SchoolClassWhereInputSchema,
	SchoolClassWhereUniqueInputSchema,
	SchoolClassUpdateInputSchema,
} from "../prisma/generated/zod";

import { client } from "..";

async function createSchoolClass(schoolClass: Prisma.SchoolClassCreateInput) {
	try {
		SchoolClassCreateInputSchema.parse(schoolClass);

		const newSchoolClass = await client.schoolClass.create({
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

async function getSchoolClassеs(where: Prisma.SchoolClassWhereInput = {}) {
	try {
		SchoolClassWhereInputSchema.parse(where);

		const schoolClasss = await client.schoolClass.findMany({ where });

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
) {
	try {
		SchoolClassWhereUniqueInputSchema.parse(where);
		SchoolClassUpdateInputSchema.parse(data);

		const schoolClass = await client.schoolClass.update({
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

async function deleteSchoolClass(where: Prisma.SchoolClassWhereUniqueInput) {
	try {
		SchoolClassWhereUniqueInputSchema.parse(where);

		const schoolClass = await client.schoolClass.delete({
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
