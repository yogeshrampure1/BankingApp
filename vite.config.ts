import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simulates the browser environment
    setupFiles: './src/setupTests.ts', // Path to test setup file
    globals: true, // Allows using global test functions like `describe` and `it`
  },
})
