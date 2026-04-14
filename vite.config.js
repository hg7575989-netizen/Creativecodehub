import { existsSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const rootDir = fileURLToPath(new URL('.', import.meta.url))
const ignoredDirs = new Set(['.git', 'dist', 'node_modules', 'public', 'src'])

const htmlEntries = Object.fromEntries([
  ['main', resolve(rootDir, 'index.html')],
  ...readdirSync(rootDir)
    .filter((entry) => {
      if (ignoredDirs.has(entry)) return false
      const dirPath = resolve(rootDir, entry)
      return statSync(dirPath).isDirectory() && existsSync(resolve(dirPath, 'index.html'))
    })
    .map((entry) => [entry, resolve(rootDir, entry, 'index.html')]),
])

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: htmlEntries,
    },
  },
})
