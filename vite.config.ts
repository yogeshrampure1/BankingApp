import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simulates the browser environment
    setupFiles: './src/setupTests.ts', // Path to test setup file
    globals: true, // Allows using global test functions like `describe` and `it`
  },

    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom", // Use jsdom to simulate browser for React
    globals: true, // Enables globals like `describe`, `it`, `expect`
    coverage: {
      reporter: ["text", "json", "html"], // Code coverage options
    },
  },
);
