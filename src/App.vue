<script setup></script>

<template>
  <div>
    <v-locale-provider :rtl="$i18n.locale === 'ar'">
      <div class="flex h-screen">
        <SideMenu v-if="authStore.isAuthenticated"></SideMenu>
        <div class="flex-1">
          <router-view></router-view>
        </div>
      </div>
    </v-locale-provider>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import SideMenu from "./components/shared/SideMenu.vue";
import { useAuthStore } from "./store/authStore";

const authStore = useAuthStore();
</script>
<style scoped></style>
