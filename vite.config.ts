import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "https://ag.valleyexc.cc",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          ws: true,
        },
      },
    },
  };
});
