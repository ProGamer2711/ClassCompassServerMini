import { Test, TestingModule } from "@nestjs/testing";

import { SessionCleanupService } from "./session-cleanup.service";

describe("SessionCleanupService", () => {
	let service: SessionCleanupService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SessionCleanupService],
		}).compile();

		service = module.get<SessionCleanupService>(SessionCleanupService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
