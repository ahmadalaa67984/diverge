import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [vue(), vuetify()],
  test: {
    environment: "jsdom",
    deps: {
      inline: ["vuetify"], // Ensure Vuetify dependencies are processed
    },
  },
});
