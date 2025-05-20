import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const aliasPaths =
	pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "<rootDir>/",
	}) ?? {};

// Fix the @prisma/client collision with internal aliases
if (aliasPaths["^@prisma/(.*)$"]) {
	delete aliasPaths["^@prisma/(.*)$"];
}

// Add custom mapping for local prisma files (but avoid @prisma/client)
aliasPaths["^@prisma/(?!(client(?:/.*)?$))(.*)$"] = "<rootDir>/src/prisma/$2";

const jestConfig: Config = {
	preset: "ts-jest",
	moduleFileExtensions: ["ts", "js", "json"],
	rootDir: "./",
	roots: ["<rootDir>/src"],
	testEnvironment: "node",
	moduleNameMapper: aliasPaths,
};

export default jestConfig;
