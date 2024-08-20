import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	StudentCreateInputSchema,
	StudentWhereInputSchema,
	StudentWhereUniqueInputSchema,
	StudentUpdateInputSchema,
} from "../prisma/generated/zod";

import { client } from "..";

async function createStudent(student: Prisma.StudentCreateInput) {
	try {
		StudentCreateInputSchema.parse(student);

		const newStudent = await client.student.create({
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

async function getStudents(where: Prisma.StudentWhereInput = {}) {
	try {
		StudentWhereInputSchema.parse(where);

		const students = await client.student.findMany({
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
) {
	try {
		StudentWhereUniqueInputSchema.parse(where);
		StudentUpdateInputSchema.parse(data);

		const student = await client.student.update({
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

async function deleteStudent(where: Prisma.StudentWhereUniqueInput) {
	try {
		StudentWhereUniqueInputSchema.parse(where);

		const student = await client.student.delete({
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
