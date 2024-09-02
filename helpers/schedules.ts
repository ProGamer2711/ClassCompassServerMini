import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	ScheduleCreateInputSchema,
	ScheduleWhereInputSchema,
	ScheduleWhereUniqueInputSchema,
	ScheduleUpdateInputSchema,
} from "../prisma/generated/zod";
import type { Schedule } from "../types/interfaces";

import { prismaClient } from "..";

async function createSchedule(
	schedule: Prisma.ScheduleCreateInput
): Promise<Schedule | { error: any }> {
	try {
		ScheduleCreateInputSchema.parse(schedule);

		const newSchedule = await prismaClient.schedule.create({
			data: schedule,
		});

		return newSchedule;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Разписанието вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getSchedules(
	where: Prisma.ScheduleWhereInput = {}
): Promise<Schedule[] | { error: any }> {
	try {
		ScheduleWhereInputSchema.parse(where);

		const schedules = await prismaClient.schedule.findMany({
			where,
			include: { lessons: true },
		});

		return schedules;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateSchedule(
	where: Prisma.ScheduleWhereUniqueInput,
	data: Prisma.ScheduleUpdateInput
): Promise<Schedule | { error: any }> {
	try {
		ScheduleWhereUniqueInputSchema.parse(where);
		ScheduleUpdateInputSchema.parse(data);

		const schedule = await prismaClient.schedule.update({
			where,
			data,
		});

		return schedule;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Разписанието не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteSchedule(
	where: Prisma.ScheduleWhereUniqueInput
): Promise<Schedule | { error: any }> {
	try {
		ScheduleWhereUniqueInputSchema.parse(where);

		const schedule = await prismaClient.schedule.delete({
			where,
		});

		return schedule;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Разписанието не беше намерен." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createSchedule, getSchedules, updateSchedule, deleteSchedule };
