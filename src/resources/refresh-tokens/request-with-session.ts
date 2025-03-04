import { Session } from "@prisma/client";
import { Request } from "express";

export interface RequestWithSession extends Request {
	session?: Session;
	// make the user object never accessible in this case (it will have a trash value)
	user: never;
}
