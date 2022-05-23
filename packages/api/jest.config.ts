import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
  moduleDirectories: ["node_modules"],
  setupFiles: ["<rootDir>/jest/jest.setup.ts"],
  clearMocks: true,
  maxConcurrency: 1,
};
export default config;