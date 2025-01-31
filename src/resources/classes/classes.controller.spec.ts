import { Test, TestingModule } from "@nestjs/testing";

import { ClassesController } from "./classes.controller";
import { ClassesService } from "./classes.service";

describe("ClassController", () => {
	let controller: ClassesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ClassesController],
			providers: [ClassesService],
		}).compile();

		controller = module.get<ClassesController>(ClassesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
