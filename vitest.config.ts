import { defineConfig } from "vitest/config";
import vitestConfig from "./vite.config";

export default defineConfig({
  ...vitestConfig,
  test: {
    environmentMatchGlobs: [["**/*.{spec,test}.ts", "happy-dom"]]
  }
});
