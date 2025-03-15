<template>
  <v-card class="z-30">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        class="h-screen"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
            to="/dashboard"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-theme-light-dark"
            title="dark mode"
            value="dark mode"
            @click="toggleTheme"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-translate"
            title="Language"
            value="Language"
            @click="toggleLanguage"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
            @click="handleLogOut"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/authStore";
import { useTheme } from "vuetify";
import { useDarkMode } from "../../composables/useDarkMode";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const currentLang = ref(locale.value);

const toggleLanguage = () => {
  currentLang.value = currentLang.value === "en" ? "ar" : "en";
  locale.value = currentLang.value;
  localStorage.setItem("lang", currentLang.value);
};
const { isDarkMode, toggleDarkMode } = useDarkMode();
const theme = useTheme();

const drawer = ref<boolean>(true);
const rail = ref<boolean>(true);

const router = useRouter();
const authStore = useAuthStore();

theme.global.name.value = isDarkMode.value ? "dark" : "light";

const toggleTheme = () => {
  toggleDarkMode();
  theme.global.name.value = isDarkMode.value ? "dark" : "light"; // ✅ Apply theme instantly
};

const handleLogOut = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
