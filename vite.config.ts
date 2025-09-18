import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000, // optional: you can change the port here
  },
  build: {
    outDir: 'dist', // output directory
  },
  resolve: {
    alias: {
      '@': '/src', // optional: allows using '@' as alias for src directory
    },
  },
})