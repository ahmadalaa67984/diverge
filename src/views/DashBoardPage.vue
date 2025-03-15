<template>
  <DashBoardMain :user="user"></DashBoardMain>
</template>

<script setup lang="ts">
import DashBoardMain from "../components/dashBoard/DashBoardMain.vue";
import SideMenu from "../components/shared/SideMenu.vue";
import { useAuthStore } from "../store/authStore";
import { User } from "../utils/interfaces";

const user: User = useAuthStore().user;
</script>

<style lang="scss" scoped></style>
