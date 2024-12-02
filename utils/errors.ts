import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

// TODO: improve this function
export function handleError(error: any) {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		switch (error.code) {
			case "P2002":
				return { error: "Document already exists." };
			case "P2025":
				return { error: "Document not found." };
			// Add more cases as needed
		}
	} else if (error instanceof ZodError) {
		return { error: error.flatten() }; // Customize this further if needed
	}

	return { error: "Unknown error occurred." }; // Generic fallback error
}
