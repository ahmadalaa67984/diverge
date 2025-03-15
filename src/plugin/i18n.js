import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const savedLang = localStorage.getItem("lang") || "en";

// Set the initial direction based on saved language
// document.documentElement.setAttribute(
//   "dir",
//   savedLang === "ar" ? "rtl" : "ltr"
// );
document.documentElement.setAttribute("lang", savedLang);

const i18n = createI18n({
  locale: savedLang,
  fallbackLocale: "en",
  messages: {
    en: {
      search: "Search",
      filterByRole: "Filter by Role",
      filterByStatus: "Filter by Status", // Add this
    },
    ar,
  },
  globalInjection: true,
});

export default i18n;
