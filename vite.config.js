import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 기존: /portal 로 시작하는 모든 요청 (8401 포트)
      "/portal": {
        target: "http://coverdreamit.iptime.org:8401",
        changeOrigin: true,
        secure: false,
      },
      "/qms": {
        target: "http://coverdreamit.iptime.org:8403",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});