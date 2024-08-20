import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	SchoolCreateInputSchema,
	SchoolWhereInputSchema,
	SchoolWhereUniqueInputSchema,
	SchoolUpdateInputSchema,
} from "../prisma/generated/zod";

import { client } from "..";

async function createSchool(school: Prisma.SchoolCreateInput) {
	try {
		SchoolCreateInputSchema.parse(school);

		const newSchool = await client.school.create({
			data: school,
		});

		return newSchool;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Училището вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getSchools(where: Prisma.SchoolWhereInput = {}) {
	try {
		SchoolWhereInputSchema.parse(where);

		const schools = await client.school.findMany({
			where,
		});

		return schools;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateSchool(
	where: Prisma.SchoolWhereUniqueInput,
	data: Prisma.SchoolUpdateInput
) {
	try {
		SchoolWhereUniqueInputSchema.parse(where);
		SchoolUpdateInputSchema.parse(data);

		const school = await client.school.update({
			where,
			data,
		});

		return school;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Училището не беше намерено." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteSchool(where: Prisma.SchoolWhereUniqueInput) {
	try {
		SchoolWhereUniqueInputSchema.parse(where);

		const school = await client.school.delete({
			where,
		});

		return school;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Училището не беше намерено." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createSchool, getSchools, updateSchool, deleteSchool };
