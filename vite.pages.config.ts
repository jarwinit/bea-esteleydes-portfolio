import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/bea-esteleydes-portfolio/",
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: ".pages-build",
    rollupOptions: { input: "github-pages.html" },
  },
});
