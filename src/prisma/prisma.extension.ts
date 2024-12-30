import { Prisma } from "@prisma/client";
import {
	Operation,
	PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";

export const softDelete = Prisma.defineExtension({
	name: "softDelete",
	model: {
		$allModels: {
			softDelete<M, A>(
				this: M,
				args: Prisma.Args<M, "delete">
			): Promise<Prisma.Result<M, A, "update">> {
				const context = Prisma.getExtensionContext(this);

				// @ts-expect-error - We have no way of knowing which model we are working with
				return context.update({
					...args,
					where: {
						...args.where,
						deleted: false,
					},
					data: {
						deleted: true,
						deletedAt: new Date(),
					},
				});
			},

			// cancelSoftDelete<M, A>(
			// 	this: M,
			// 	args: Prisma.Args<M, "delete">
			// ): Promise<Prisma.Result<M, A, "update">> {
			// 	const context = Prisma.getExtensionContext(this);

			// 	// @ts-expect-error - We have no way of knowing which model we are working with
			// 	return context.update({
			// 		...args,
			// 		where: {
			// 			...args.where,
			// 			deleted: true,
			// 		},
			// 		data: {
			// 			deleted: false,
			// 			deletedAt: null,
			// 		},
			// 	});
			// },

			// findSoftDeleted<M, A>(
			// 	this: M,
			// 	args: Prisma.Args<M, "findMany">
			// ): Prisma.Result<M, A, "findMany"> {
			// 	const context = Prisma.getExtensionContext(this);

			// 	// @ts-expect-error - We have no way of knowing which model we are working
			// 	return context.findMany({
			// 		...args,
			// 		where: {
			// 			...args.where,
			// 			deleted: true,
			// 		},
			// 	});
			// },
		},
	},
});

export const filterSoftDeleted = Prisma.defineExtension({
	name: "filterSoftDeleted",
	query: {
		$allModels: {
			async $allOperations({ operation, args, query }) {
				if (
					operation === "findUnique" ||
					operation === "findUniqueOrThrow" ||
					operation === "findFirst" ||
					operation === "findFirstOrThrow" ||
					operation === "findMany" ||
					operation === "updateMany" ||
					operation === "update"
				) {
					args.where = { ...args.where, deleted: false };
				}

				return query(args);
			},
		},
	},
});

type ModelId<M, O extends Operation> = Prisma.Args<M, O>["where"]["id"];

export const ensureExists = Prisma.defineExtension({
	name: "ensureExists",
	model: {
		$allModels: {
			async ensureExists<M>(
				this: M,
				id: ModelId<M, "findUnique">
			): Promise<void> {
				const context = Prisma.getExtensionContext(this);

				// @ts-expect-error - We have no way of knowing which model we are working with
				const result = await context.findUnique({
					where: { id },
					// select only the ID to reduce the amount of data transferred
					// therefore increasing performance (slightly)
					select: { id: true },
				});

				if (result === null) {
					throw new PrismaClientKnownRequestError(
						"An operation failed because it depends on one or more records that were required but not found. Expected a record, found none.",
						{
							code: "P2025",
							clientVersion: Prisma.prismaVersion.client,
							meta: {
								modelName: context.$name,
								cause: "Expected a record, found none.",
							},
						}
					);
				}
			},
			async ensureExistsMany<M>(
				this: M,
				ids: ModelId<M, "findMany">[]
			): Promise<void> {
				const context = Prisma.getExtensionContext(this);

				// Fetch all matching records using `findMany`
				// @ts-expect-error - We have no way of knowing which model we are working with
				const results = await context.findMany({
					where: { id: { in: ids } },
					// select only the ID to reduce the amount of data transferred
					// therefore increasing performance (slightly)
					select: { id: true },
				});

				const missingIds = ids.filter(
					// @ts-expect-error - We have no way of knowing which model we are working with
					id => !results.some(result => result.id === id)
				);

				if (missingIds.length > 0) {
					throw new PrismaClientKnownRequestError(
						"An operation failed because it depends on one or more records that were required but not found. Expected a record, found none.",
						{
							code: "P2025",
							clientVersion: Prisma.prismaVersion.client,
							meta: {
								modelName: context.$name,
								cause: `Expected records with ID(s) [${missingIds.join(
									", "
								)}], found none.`,
							},
						}
					);
				}
			},
		},
	},
});
