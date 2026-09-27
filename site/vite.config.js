import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static SPA build. Output in dist/ is uploaded as-is to S3 (see README).
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
