import { ApiProperty } from "@nestjs/swagger";
import { Building } from "@prisma/client";

export class BuildingEntity implements Building {
	constructor(partial: Partial<BuildingEntity>) {
		Object.assign(this, partial);
	}

	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	schoolId: string;

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
