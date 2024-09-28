/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    env: {
      
    },
    coverage: {
      reporter: ["text", "lcov"],
    },
    environment: 'jsdom',
    include: ['**/*.test.tsx', '**/*.test.ts', '**/*.spec.tsx', '**/*.spec.ts'],
    exclude: [
      '**/node_modules/**',
      '**/.next/**',
      '**/coverage/**',
      './src/mock/**',
      '**/playwright/**',
    ],
    globals: true,
    setupFiles: './setupTest.ts',
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})