import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// @ts-expect-error because of Tauri environment variables
const host = process.env.TAURI_DEV_HOST

export default defineConfig(async () => ({
  clearScreen: false,

  plugins: [
    react()
  ],

  server: {
    port: 1420,
    strictPort: true,
    host: host || false,

    hmr: host ? {
        protocol: "ws",
        host,
        port: 1421
      } : undefined,

    watch: {
      ignored: ["**/src-tauri/**"],
    }
  }
}))
