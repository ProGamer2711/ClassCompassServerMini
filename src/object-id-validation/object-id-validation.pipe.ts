import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isMongoId } from "class-validator";

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
	transform(value: any) {
		if (!isMongoId(value)) {
			throw new BadRequestException(`${value} is not a valid ObjectId`);
		}

		return value;
	}
}
