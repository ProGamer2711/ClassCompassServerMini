import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	SubjectCreateInputSchema,
	SubjectWhereInputSchema,
	SubjectWhereUniqueInputSchema,
	SubjectUpdateInputSchema,
} from "../prisma/generated/zod";
import type { Subject } from "../types/interfaces";

import { prismaClient } from "..";

async function createSubject(
	subject: Prisma.SubjectCreateInput
): Promise<Subject | { error: any }> {
	try {
		SubjectCreateInputSchema.parse(subject);

		const newSubject = await prismaClient.subject.create({
			data: subject,
		});

		return newSubject;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Предметът вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getSubjects(
	where: Prisma.SubjectWhereInput = {}
): Promise<Subject[] | { error: any }> {
	try {
		SubjectWhereInputSchema.parse(where);

		const subjects = await prismaClient.subject.findMany({ where });

		return subjects;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateSubject(
	where: Prisma.SubjectWhereUniqueInput,
	data: Prisma.SubjectUpdateInput
): Promise<Subject | { error: any }> {
	try {
		SubjectWhereUniqueInputSchema.parse(where);
		SubjectUpdateInputSchema.parse(data);

		const subject = await prismaClient.subject.update({
			where,
			data,
		});

		return subject;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Предметът не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteSubject(
	where: Prisma.SubjectWhereUniqueInput
): Promise<Subject | { error: any }> {
	try {
		SubjectWhereUniqueInputSchema.parse(where);

		const subject = await prismaClient.subject.delete({
			where,
		});

		return subject;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Предметът не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createSubject, getSubjects, updateSubject, deleteSubject };
