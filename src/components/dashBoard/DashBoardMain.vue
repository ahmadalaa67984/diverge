<template>
  <div class="flex flex-col p-4">
    <div class="flex gap-2 items-center">
      <v-icon icon="mdi-home" size="30"></v-icon>
      <h1 class="font-bold text-3xl">{{ $t("dashboard") }}</h1>
    </div>
    <h1>{{ $t("welcome") }}, {{ authStore.user?.name }}</h1>
    <DashBoardTable :user="user"></DashBoardTable>
    <!-- <DashBoardUsersTable :user="user"></DashBoardUsersTable> -->
  </div>
</template>

<script setup lang="ts">
import DashBoardUsersTable from "./DashBoardUsersTable.vue";
import { useAuthStore } from "../../store/authStore";
import { User } from "../../utils/interfaces";
import DashBoardTable from "./DashBoardTable.vue";
import DashBoardAddUserPopUp from "./DashboardMainComponentes/DashBoardAddUserPopUp.vue";
import { ref } from "vue";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
