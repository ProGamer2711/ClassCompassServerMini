import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import {
	RoomCreateInputSchema,
	RoomWhereInputSchema,
	RoomWhereUniqueInputSchema,
	RoomUpdateInputSchema,
} from "../prisma/generated/zod";
import type { Room } from "../types/interfaces";

import { prismaClient } from "..";

async function createRoom(
	room: Prisma.RoomCreateInput
): Promise<Room | { error: any }> {
	try {
		RoomCreateInputSchema.parse(room);

		const newRoom = await prismaClient.room.create({
			data: room,
		});

		return newRoom;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Стаята вече съществува." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function getRooms(
	where: Prisma.RoomWhereInput = {}
): Promise<Room[] | { error: any }> {
	try {
		RoomWhereInputSchema.parse(where);

		const rooms = await prismaClient.room.findMany({
			where,
		});

		return rooms;
	} catch (error) {
		if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function updateRoom(
	where: Prisma.RoomWhereUniqueInput,
	data: Prisma.RoomUpdateInput
): Promise<Room | { error: any }> {
	try {
		RoomWhereUniqueInputSchema.parse(where);
		RoomUpdateInputSchema.parse(data);

		const room = await prismaClient.room.update({
			where,
			data,
		});

		return room;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Стаята не беше намерена." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

async function deleteRoom(
	where: Prisma.RoomWhereUniqueInput
): Promise<Room | { error: any }> {
	try {
		RoomWhereUniqueInputSchema.parse(where);

		const room = await prismaClient.room.delete({
			where,
		});

		return room;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return { error: "Стаята не беше намерена." };
			}
		} else if (error instanceof ZodError) {
			// TODO: make a better handler
			return { error: error.flatten() };
		}

		return { error };
	}
}

export { createRoom, getRooms, updateRoom, deleteRoom };
