import { Prisma } from "@prisma/client";

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
