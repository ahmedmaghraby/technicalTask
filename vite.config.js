import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import tailwindcss from "tailwindcss";

const config = defineConfig({
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
  },

  build: {
    minify: true,
  },

  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver({
          componentPrefix: "",
        }),
      ],
      dts: "src/components.d.ts",
    }),
    Icons(),
    AutoImport({
      imports: ["@vueuse/core"],
      dts: "src/auto-imports.d.ts",
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    port: 4200,
    proxy: {
      "/api": {
        target: "https://api.foodics.dev", // Foodics API base URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove `/api` prefix
      },
    },
  },
});

export default config;
