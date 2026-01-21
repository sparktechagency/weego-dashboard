import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allows access via IP or hostname
    port: 3000,
    strictPort: true,
    allowedHosts: ["admin.weego.com.mx"], // ✅ add your domain here
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: ["admin.weego.com.mx"], // ✅ also for preview
  },
});
