import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import csvPlugin from 'vite-plugin-csv'

export default defineConfig({
  server: {
    port: 8080,
    host: "::"
  },
  plugins: [
    react(),
    csvPlugin
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})