<template>
  <v-snackbar v-model="snackbar.visible" :color="snackbar.type" timeout="3000">
    {{ snackbar.message }}
    <v-btn color="white" text @click="snackbar.visible = false" flat>{{
      $t("close")
    }}</v-btn>
  </v-snackbar>
  <v-card :title="$t('users')" class="mt-6" flat>
    <UserFilters ref="filters" />
    <!-- Add User Icon -->
    <v-icon
      large
      class="mx-2"
      @click="addUserDialog = true"
      v-permission="RolesGroup.ADMINISTRATION"
    >
      mdi-account-plus
    </v-icon>

    <UserTable
      :user-role="user.role"
      @edit-user="startEdit"
      @delete-user="confirmDelete"
      @view-user="openUserDetails"
    />

    <UserDetailsDialog
      :show="userDetailsDialog"
      :user="currentUser"
      @close="userDetailsDialog = false"
    />
    <DashBoardUpdateUserPopUp
      :show="editDialog"
      :editableUser="editableUser"
      :close="() => (editDialog = false)"
      :currentUser="currentUser"
    />
    <!-- add user -->
    <DashBoardAddUserPopUp
      :show="addUserDialog"
      :close="() => (addUserDialog = false)"
      @updateSnackbar="handleSnackbar"
    />

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">{{ $t("confirmDeletion") }}</v-card-title>
        <v-card-text>{{ $t("confirmDeletionMessage") }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">{{
            $t("cancel")
          }}</v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteUser(pendingDeleteId)"
            >{{ $t("delete") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUserStore } from "../../store/userStore";
import UserFilters from "./DashboardMainComponentes/DashBoardTableHeader.vue";
import UserTable from "./DashboardMainComponentes/DashBoardUserTable.vue";
import UserDetailsDialog from "./DashboardMainComponentes/DashBoardDetailsUserPopUp.vue";
import DashBoardUpdateUserPopUp from "./DashboardMainComponentes/DashBoardUpdateUserPopUp.vue";
import DashBoardAddUserPopUp from "./DashboardMainComponentes/DashBoardAddUserPopUp.vue";
import { mdiAccountPlus } from "@mdi/js"; // Import the icon (make sure to install @mdi/js or use your project's icon set)
import { RolesGroup } from "../../utils/roles.enum";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});
const userStore = useUserStore();
const dialog = ref(false);
const pendingDeleteId = ref<number | null>(null);
const userDetailsDialog = ref(false);
const currentUser = ref(null);
const snackbar = ref({
  visible: false,
  message: "",
  type: "success", // 'success' or 'error'
});
const editableUser = reactive<{ name: string; email: string }>({
  name: "",
  email: "",
});
const editDialog = ref(false);
const addUserDialog = ref(false);
const startEdit = (user: User) => {
  currentUser.value = user;
  // Destructure and manually assign to reactive object
  ({ name: editableUser.name, email: editableUser.email } = user);
  editDialog.value = true;
};
function handleSnackbar(data) {
  snackbar.value = data;
}

const confirmDelete = (userId: number) => {
  pendingDeleteId.value = userId;
  dialog.value = true;
};

const deleteUser = async (userId: number) => {
  dialog.value = false;
  await userStore.deleteUser(userId);
};

const openUserDetails = (user) => {
  currentUser.value = user;
  userDetailsDialog.value = true;
};
</script>
