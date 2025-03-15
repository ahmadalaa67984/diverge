<template>
  <v-btn @click="toggleLanguage" flat class="text-center">
    <p class="text-center w-full">
      {{ currentLang === "en" ? "En" : "ع" }}
    </p>
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const currentLang = ref(locale.value);

const toggleLanguage = () => {
  currentLang.value = currentLang.value === "en" ? "ar" : "en";
  locale.value = currentLang.value;
  localStorage.setItem("lang", currentLang.value);
};
</script>
