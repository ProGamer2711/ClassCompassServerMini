import { Prisma } from "@prisma/client";

type Models = Uncapitalize<Prisma.ModelName>;

type Actions = "create" | "read" | "update" | "delete" | "*";

type StandardAttributes = `${Models}:${Actions}`;

// No custom attributes for now
type CustomAttributes = never;

export type Attributes = StandardAttributes | CustomAttributes;
