import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "5272d039-2a2e-459b-ae42-46a54cd9f1cc-00-9g2n60ylwdw.spock.replit.dev",
    ],
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
