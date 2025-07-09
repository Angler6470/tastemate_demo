import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: 'all',
    'tastematedemo-belowheights00.replit.app'
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3001',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: 'all'
  }
})