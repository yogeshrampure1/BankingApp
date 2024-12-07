import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom", // Use jsdom to simulate browser for React
    globals: true, // Enables globals like `describe`, `it`, `expect`
    coverage: {
      reporter: ["text", "json", "html"], // Code coverage options
    },
  },
});
