import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace with your actual Replit domain if different:
const replitDomain = "tastemate-demo.replit.app";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [replitDomain],
    proxy: {
      "/api": {
        target: "http://0.0.0.0:3001", // Your backend runs on port 3001
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [replitDomain],
  },
});
