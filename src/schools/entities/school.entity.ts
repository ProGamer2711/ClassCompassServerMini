import { ApiProperty } from "@nestjs/swagger";
import { School } from "@prisma/client";

export class SchoolEntity implements School {
	constructor(partial: Partial<SchoolEntity>) {
		Object.assign(this, partial);
	}

	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	deleted: boolean;

	@ApiProperty({
		required: false,
		nullable: true,
	})
	deletedAt: Date | null;
}
