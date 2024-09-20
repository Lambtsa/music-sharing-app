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
      NEXT_PUBLIC_BASE_URL: 'http://localhost:8080',
      API_URL: 'https://smart-supply-api-qual.pp.dktapp.cloud',
      FED_URL: 'http://localhost:3000',
      NEXTAUTH_URL: 'http://localhost:3001'
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