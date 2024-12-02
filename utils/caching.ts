import type { Repository } from "redis-om";

import fs from "fs";
import path from "path";

export const DEFAULT_TTL = 60 * 60 * 24; // 24 hours

export function createIndexes(modelsPath: string) {
	try {
		fs.readdirSync(modelsPath).forEach(async file => {
			const imports = await import(path.join(modelsPath, file));

			if (!imports) {
				console.log(`No imports found for ${file}`);

				return;
			}

			// TODO: Check for a better way to get the repository
			// the first key is the exported repository
			const repository = Object.values(imports)[0] as Repository;

			if (!repository) {
				console.log(`No repository found for ${file}`);

				return;
			}

			if (!repository.createIndex) {
				console.log(
					`No createIndex method found for ${file}'s repository`
				);

				return;
			}

			// create indexes
			await repository.createIndex();
		});
	} catch (error) {
		console.error(error);
	}
}
