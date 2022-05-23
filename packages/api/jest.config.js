module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
  moduleDirectories: ["node_modules"],
  setupFiles: ["<rootDir>/jest/jest.setup.js"],
  clearMocks: true,
  maxConcurrency: 1,
};
