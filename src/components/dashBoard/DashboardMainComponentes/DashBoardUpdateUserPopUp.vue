<template>
  <v-dialog v-model="props.show" persistent max-width="500px">
    <v-card>
      <v-card-title>{{ $t("editUser") }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="editableUser.name" label="Name"></v-text-field>
        <v-text-field v-model="editableUser.email" label="Email"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="saveEdit()">
          {{ $t("save") }}
        </v-btn>
        <v-btn color="grey darken-1" text @click="close()">
          {{ $t("cancel") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from "../../../store/userStore";
import { User } from "../../../utils/interfaces";

// Define the props with proper types
const props = defineProps({
  show: Boolean,
  editableUser: Object as PropType<Partial<User>>, // Use Partial<User> if editableUser might not have all User properties
  saveEdit: Function,
  close: Function,
  currentUser: Object as PropType<User>, // Ensure currentUser is treated as a User
});
const userStore = useUserStore();

const saveEdit = async () => {
  if (props.editableUser) {
    try {
      await userStore.updateUser({
        ...props.currentUser,
        name: props.editableUser.name,
        email: props.editableUser.email,
      });
      if (props.close) {
        props.close();
      }
      userStore.fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }
};
</script>

<style scoped></style>
