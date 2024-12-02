import { Prisma, PrismaClient } from "@prisma/client";
import { prismaClient } from "..";
import { handleError } from "./errors";
import type { Repository } from "redis-om";

function plularizeModelName(modelName: PrismaModelName): string {
	if (modelName === "schoolClass") {
		return "schoolClasses";
	}

	return `${modelName}s`;
}

type PrismaModelName = Uncapitalize<Prisma.ModelName>;

// Function argument types
type CreateArgs<T extends PrismaModelName> = Parameters<
	PrismaClient[T]["create"]
>[0];

type FindManyArgs<T extends PrismaModelName> = Parameters<
	PrismaClient[T]["findMany"]
>[0];

type FindUniqueOrThrowArgs<T extends PrismaModelName> = Parameters<
	PrismaClient[T]["findUniqueOrThrow"]
>[0];

type UpdateArgs<T extends PrismaModelName> = Parameters<
	PrismaClient[T]["update"]
>[0];

type DeleteArgs<T extends PrismaModelName> = Parameters<
	PrismaClient[T]["delete"]
>[0];

// Return type types
type CreateReturnType<T extends PrismaModelName> = Awaited<
	ReturnType<PrismaClient[T]["create"]>
>;

type FindManyReturnType<T extends PrismaModelName> = Awaited<
	ReturnType<PrismaClient[T]["findMany"]>
>;

type FindUniqueOrThrowReturnType<T extends PrismaModelName> = Awaited<
	ReturnType<PrismaClient[T]["findUniqueOrThrow"]>
>;

type UpdateReturnType<T extends PrismaModelName> = Awaited<
	ReturnType<PrismaClient[T]["update"]>
>;

type DeleteReturnType<T extends PrismaModelName> = Awaited<
	ReturnType<PrismaClient[T]["delete"]>
>;

async function create<
	ModelName extends PrismaModelName,
	ModelCreateArgs extends CreateArgs<ModelName>
>(
	modelName: ModelName,
	createArgs: ModelCreateArgs,
	createArgsSchema: Zod.Schema<ModelCreateArgs>
): Promise<CreateReturnType<ModelName> | { error: any }> {
	try {
		createArgsSchema.parse(createArgs);

		const newDocument = await (prismaClient[modelName] as any).create(
			createArgs
		);

		return newDocument;
	} catch (error) {
		return handleError(error);
	}
}

// Overloads for findMany
// We can have either 1 or 3 arguments
async function findMany<
	ModelName extends PrismaModelName,
	ModelFindManyArgs extends FindManyArgs<ModelName>
>(model: ModelName): Promise<FindManyReturnType<ModelName> | { error: any }>;

async function findMany<
	ModelName extends PrismaModelName,
	ModelFindManyArgs extends FindManyArgs<ModelName>
>(
	model: ModelName,
	findManyArgs: ModelFindManyArgs,
	findManyArgsSchema: Zod.Schema<ModelFindManyArgs>
): Promise<FindManyReturnType<ModelName> | { error: any }>;

async function findMany<
	ModelName extends PrismaModelName,
	ModelFindManyArgs extends FindManyArgs<ModelName>
>(
	model: ModelName,
	findManyArgs?: ModelFindManyArgs,
	findManyArgsSchema?: Zod.Schema<ModelFindManyArgs>
): Promise<FindManyReturnType<ModelName> | { error: any }> {
	try {
		findManyArgsSchema?.parse(findManyArgs);

		const newDocument = await (prismaClient[model] as any).findMany(
			findManyArgs ?? {}
		);

		return newDocument;
	} catch (error) {
		return handleError(error);
	}
}

async function findUniqueOrThrow<
	ModelName extends PrismaModelName,
	ModelFindUniqueOrThrowArgs extends FindUniqueOrThrowArgs<ModelName>
>(
	model: ModelName,
	findUniqueOrThrowArgs: ModelFindUniqueOrThrowArgs,
	findUniqueOrThrowArgsSchema: Zod.Schema<ModelFindUniqueOrThrowArgs>
): Promise<FindUniqueOrThrowReturnType<ModelName> | { error: any }> {
	try {
		findUniqueOrThrowArgsSchema.parse(findUniqueOrThrowArgs);

		// check the redis cache for the document
		// if it exists, return it
		// if it doesn't exist, fetch it from the database and store it in the cache
		// the repository is in a file called models/[MODEL_NAME].ts
		// it exports a repository object called [MODEL_NAME]Repository

		const modelImport = await import(
			`../models/${plularizeModelName(model)}`
		);

		const modelRepository: Repository<
			FindUniqueOrThrowReturnType<ModelName>
		> = modelImport[`${plularizeModelName(model)}Repository`];

		if (!modelRepository) {
			return { error: "Repository not found." };
		}

		const newDocument = await (
			prismaClient[model] as any
		).findUniqueOrThrow(findUniqueOrThrowArgs);

		if (!newDocument) {
			return { error: "Document not found." };
		}

		return newDocument;
	} catch (error) {
		return handleError(error);
	}
}

async function update<
	ModelName extends PrismaModelName,
	ModelUpdateArgs extends UpdateArgs<ModelName>
>(
	model: ModelName,
	updateArgs: ModelUpdateArgs,
	updateArgsSchema: Zod.Schema<ModelUpdateArgs>
): Promise<UpdateReturnType<ModelName> | { error: any }> {
	try {
		updateArgsSchema.parse(updateArgs);

		const updatedDocument = await (prismaClient[model] as any).update(
			updateArgs
		);

		return updatedDocument;
	} catch (error) {
		return handleError(error);
	}
}

async function _delete<
	ModelName extends PrismaModelName,
	ModelDeleteArgs extends DeleteArgs<ModelName>
>(
	model: ModelName,
	deleteArgs: ModelDeleteArgs,
	deleteArgsSchema: Zod.Schema<ModelDeleteArgs>
): Promise<DeleteReturnType<ModelName> | { error: any }> {
	try {
		deleteArgsSchema.parse(deleteArgs);

		const deletedDocument = await (prismaClient[model] as any).delete(
			deleteArgs
		);

		return deletedDocument;
	} catch (error) {
		return handleError(error);
	}
}

export { create, findMany, findUniqueOrThrow, update, _delete as delete };
