import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      port: process.env.VITE_PORT,
    },
    compilerOptions: {
      types: ["vite/client"],
    },
    test: {
      compilerOptions: {
        types: ["vite/client", "@testing-library/jest-dom"],
      },
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTests.js",
      clearMocks: true,
    },
  });
};
