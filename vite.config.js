import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project is served from https://<user>.github.io/boss/ on GitHub Pages,
// so the asset base must be the repository name.
export default defineConfig({
  base: '/boss/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
