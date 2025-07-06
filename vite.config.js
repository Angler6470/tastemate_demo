import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "18322abe-9e44-43de-a485-e42fbb284294-00-2umn6e0kizgy5.riker.replit.dev",
    ],
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
