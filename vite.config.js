import { defineConfig } from "vite";

export default defineConfig({
  base: "/my-portfolio/",
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
