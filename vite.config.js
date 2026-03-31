import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        websiteDevelopmentLucknow: resolve(rootDir, 'website-development-lucknow/index.html'),
        digitalMarketingServices: resolve(rootDir, 'digital-marketing-services/index.html'),
      },
    },
  },
})
