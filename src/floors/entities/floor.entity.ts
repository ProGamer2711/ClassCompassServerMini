import { ApiProperty } from "@nestjs/swagger";
import { Floor } from "@prisma/client";

export class FloorEntity implements Floor {
	constructor(partial: Partial<FloorEntity>) {
		Object.assign(this, partial);
	}

	@ApiProperty()
	id: string;

	@ApiProperty()
	number: number;

	@ApiProperty({
		required: false,
		nullable: true,
	})
	description: string | null;

	@ApiProperty({
		required: false,
		nullable: true,
	})
	planFilename: string | null;

	@ApiProperty({
		required: false,
		nullable: true,
	})
	maskFilename: string | null;

	@ApiProperty()
	buildingId: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty({
		required: false,
		nullable: true,
	})
	deletedAt: Date | null;
}
