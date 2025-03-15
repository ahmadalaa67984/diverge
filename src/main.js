// main.js
import { createApp, nextTick, watch } from "vue";
import "./styles/style.css";
import App from "./App.vue";
import "vuetify/styles"; // Import Vuetify styles
import router from "./router";
import vuetify from "./plugin/vuetify";
import { createPinia } from "pinia";
import vPermission from "./directives/v-permission";
import i18n from "./plugin/i18n"; // Import i18n

const pinia = createPinia();

async function init() {
  const app = createApp(App);
  app.use(router);
  app.use(pinia);
  app.use(vuetify);
  app.use(i18n);
  app.directive("permission", vPermission);
  app.mount("#app");
}

init();
