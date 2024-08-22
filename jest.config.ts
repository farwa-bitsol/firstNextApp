import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    '^@/services/(.*)$': '<rootDir>/services/$1',
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "@swc/jest",
  },
};

export default createJestConfig(config);
