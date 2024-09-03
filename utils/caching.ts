import type { Repository } from "redis-om";

import fs from "fs";
import path from "path";

export function createIndexes(modelsPath: string) {
	try {
		fs.readdirSync(modelsPath).forEach(async file => {
			const imports = await import(path.join(modelsPath, file));

			// TODO: Check for a better way to get the repository
			// the first key is the exported repository
			const repository: Repository = imports[Object.keys(imports)[0]];

			// create indexes
			await repository.createIndex();
		});
	} catch (error) {
		console.error(error);
	}
}
