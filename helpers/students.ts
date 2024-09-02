import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	StudentCreateInputSchema,
	StudentWhereInputSchema,
	StudentWhereUniqueInputSchema,
	StudentUpdateInputSchema,
} from "../prisma/generated/zod";
import type { Student } from "../types/interfaces";

import { prismaClient } from "..";

async function createStudent(
	student: Prisma.StudentCreateInput
): Promise<Student | { error: any }> {
	try {
		StudentCreateInputSchema.parse(student);

		const newStudent = await prismaClient.student.create({
			data: student,
		});

		return newStudent;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Ученикът вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getStudents(
	where: Prisma.StudentWhereInput = {}
): Promise<Student[] | { error: any }> {
	try {
		StudentWhereInputSchema.parse(where);

		const students = await prismaClient.student.findMany({
			where,
		});

		return students;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateStudent(
	where: Prisma.StudentWhereUniqueInput,
	data: Prisma.StudentUpdateInput
): Promise<Student | { error: any }> {
	try {
		StudentWhereUniqueInputSchema.parse(where);
		StudentUpdateInputSchema.parse(data);

		const student = await prismaClient.student.update({
			where,
			data,
		});

		return student;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Ученикът не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteStudent(
	where: Prisma.StudentWhereUniqueInput
): Promise<Student | { error: any }> {
	try {
		StudentWhereUniqueInputSchema.parse(where);

		const student = await prismaClient.student.delete({
			where,
		});

		return student;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Ученикът не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createStudent, getStudents, updateStudent, deleteStudent };
