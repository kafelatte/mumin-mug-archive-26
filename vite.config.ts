import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import csv from 'vite-plugin-csv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), csv()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})