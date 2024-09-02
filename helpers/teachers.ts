import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	TeacherCreateInputSchema,
	TeacherWhereInputSchema,
	TeacherWhereUniqueInputSchema,
	TeacherUpdateInputSchema,
} from "../prisma/generated/zod";
import type { Teacher } from "../types/interfaces";

import { prismaClient } from "..";

async function createTeacher(
	teacher: Prisma.TeacherCreateInput
): Promise<Teacher | { error: any }> {
	try {
		TeacherCreateInputSchema.parse(teacher);

		const newTeacher = await prismaClient.teacher.create({
			data: teacher,
		});

		return newTeacher;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Преподавателят вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getTeachers(
	where: Prisma.TeacherWhereInput = {}
): Promise<Teacher[] | { error: any }> {
	try {
		TeacherWhereInputSchema.parse(where);

		const teachers = await prismaClient.teacher.findMany({ where });

		return teachers;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateTeacher(
	where: Prisma.TeacherWhereUniqueInput,
	data: Prisma.TeacherUpdateInput
): Promise<Teacher | { error: any }> {
	try {
		TeacherWhereUniqueInputSchema.parse(where);
		TeacherUpdateInputSchema.parse(data);

		const teacher = await prismaClient.teacher.update({
			where,
			data,
		});

		return teacher;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Преподавателят не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteTeacher(
	where: Prisma.TeacherWhereUniqueInput
): Promise<Teacher | { error: any }> {
	try {
		TeacherWhereUniqueInputSchema.parse(where);

		const teacher = await prismaClient.teacher.delete({
			where,
		});

		return teacher;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Преподавателят не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createTeacher, getTeachers, updateTeacher, deleteTeacher };
