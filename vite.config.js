import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createVuetify } from "vuetify";
import vuetify from "vite-plugin-vuetify";
import { mergeConfig } from "vite";
import { configDefaults } from "vitest/config";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  test: {
    globals: true,
    environment: "jsdom",
    server: {
      deps: {
        inline: ["vuetify"],
      },
    },
  },
});
