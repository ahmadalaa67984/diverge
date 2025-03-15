<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :loading="loading"
    @click:row="(event, { item }) => openUserDetails(item)"
  >
    <template v-slot:item.actions="{ item }">
      <v-btn
        icon
        @click.prevent.stop="startEdit(item)"
        flat
        v-permission="RolesGroup.MANAGEMENT"
      >
        <v-icon color="blue">mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.prevent.stop="confirmDelete(item.id)"
        flat
        v-permission="RolesGroup.ADMINISTRATION"
      >
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "../../../store/userStore";
import {
  usersTableHeadersAdmin,
  usersTableHeadersViewer,
} from "../../../utils/constents";
import { Roles, RolesGroup } from "../../../utils/roles.enum";

const props = defineProps({
  userRole: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();
const users = computed(() => userStore.users);
const loading = computed(() => userStore.loading);
const headers = computed(() =>
  RolesGroup.MANAGEMENT.includes(props.userRole as Roles)
    ? usersTableHeadersAdmin
    : usersTableHeadersViewer
);

const emit = defineEmits(["edit-user", "delete-user", "view-user"]);

const confirmDelete = (id: number) => emit("delete-user", id);
const startEdit = (user) => emit("edit-user", user);
const openUserDetails = (user) => emit("view-user", user);
</script>
