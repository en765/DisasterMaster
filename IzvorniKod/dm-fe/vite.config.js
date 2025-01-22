import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',               // Omogućava eksterni pristup
    port: process.env.PORT || 3000, // Render koristi `PORT` varijablu okruženja
  },
});
