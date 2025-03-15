// plugin/vuetify.js
import { createVuetify } from "vuetify";
import i18n from "./i18n";
import { useI18n } from "vue-i18n";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";

const vuetify = createVuetify({
  defaults: {
    global: { ripple: false },
  },
  theme: {
    defaultTheme: "dark",
  },
  current: i18n.global.locale, // Sync Vuetify with Vue I18n
  // locale: {
  //   adapter: createVueI18nAdapter({ i18n, useI18n }),
  // },
  rtl: {
    ar: true, // Enable RTL for Arabic
    en: false, // LTR for English
  },

  theme: {
    defaultTheme: localStorage.getItem("theme") || "dark", // Set the default theme
    themes: {
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
      dark: {
        primary: "#BB86FC",
        secondary: "#03DAC6",
        accent: "#FF4081",
        error: "#CF6679",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
    options: { customProperties: true },
  },
});

export default vuetify;
