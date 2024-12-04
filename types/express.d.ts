import "express"; // Import Express types for augmentation
import { Message } from "./messages";
import { Response as ResponseType } from "./responses";

declare module "express-serve-static-core" {
	export interface Response {
		sendResponse: <T>(message: Message, data: T) => void;
	}
}
