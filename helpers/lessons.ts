import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	LessonCreateInputSchema,
	LessonWhereInputSchema,
	LessonWhereUniqueInputSchema,
	LessonUpdateInputSchema,
} from "../prisma/generated/zod";

import { prismaClient } from "..";

async function createLesson(lesson: Prisma.LessonCreateInput) {
	try {
		LessonCreateInputSchema.parse(lesson);

		const newLesson = await prismaClient.lesson.create({
			data: lesson,
		});

		return newLesson;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Учебният час вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getLessons(where: Prisma.LessonWhereInput = {}) {
	try {
		LessonWhereInputSchema.parse(where);

		const lessons = await prismaClient.lesson.findMany({ where });

		return lessons;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateLesson(
	where: Prisma.LessonWhereUniqueInput,
	data: Prisma.LessonUpdateInput
) {
	try {
		LessonWhereUniqueInputSchema.parse(where);
		LessonUpdateInputSchema.parse(data);

		const lesson = await prismaClient.lesson.update({
			where,
			data,
		});

		return lesson;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Учебният час не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteLesson(where: Prisma.LessonWhereUniqueInput) {
	try {
		LessonWhereUniqueInputSchema.parse(where);

		const lesson = await prismaClient.lesson.delete({
			where,
		});

		return lesson;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Учебният час не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createLesson, getLessons, updateLesson, deleteLesson };
