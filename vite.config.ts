import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy:
        mode === "development"
          ? {
              "/api": {
                target: "https://sx.valleyexc.cc",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
                ws: true,
              },
            }
          : ({} as Record<
              string,
              | string
              | {
                  target: string;
                  changeOrigin: boolean;
                  rewrite: (path: string) => string;
                  ws: boolean;
                }
            >), // 强制转换为正确的类型
    },
  };
});
