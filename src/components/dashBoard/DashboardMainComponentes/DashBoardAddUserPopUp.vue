<template>
  <v-dialog v-model="props.show" persistent max-width="600px">
    <form @submit.prevent="submit">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ $t("addUser") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value"
                  label="Name"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  label="E-mail"
                  required
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  label="Password"
                  required
                  type="password"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="role.value.value"
                  :items="rolesFilterOptions"
                  :error-messages="role.errorMessage.value"
                  label="Role"
                  required
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" variant="text" @click="props.close">
            {{ $t("cancel") }}
          </v-btn>
          <v-btn type="submit" :loading="userStore.loadingAddUser">
            {{ $t("submit") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useUserStore } from "../../../store/userStore";
import { rolesFilterOptions } from "../../../utils/constents";
import { User } from "../../../utils/interfaces";
import { ref } from "vue"; // Import ref for reactive properties

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  close: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["updateSnackbar"]);
const userStore = useUserStore();

// Define validation schema
const { handleSubmit } = useForm({
  validationSchema: {
    name: (value: string) => (value ? true : "Name is required."),
    email: (value: string) =>
      /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value) ||
      "Must be a valid e-mail.",
    role: (value: string) => (value ? true : "Role is required."),
  },
});

// Fields with validation
const name = useField("name");
const email = useField("email");
const role = useField<{ title: string; value: string } | null>("role");
const password = useField("password");

const submit = handleSubmit(async () => {
  const userData = {
    name: name.value.value,
    email: email.value.value,
    role: role.value.value,
    password: password.value.value,
    id: "",
    profileImage: "",
    createdAt: new Date().toISOString(),
    status: "active",
  };

  await userStore.addUser(userData as User);

  if (userStore.successAddUser) {
    emit("updateSnackbar", {
      visible: true,
      message: "User added successfully!",
      type: "success",
    });
    //clear user data
    name.value.value = "";
    email.value.value = "";
    password.value.value = "";
    role.value.value = null;
    userStore.fetchUsers();
    props.close();
  } else {
    emit("updateSnackbar", {
      visible: true,
      message: userStore.errorAddUser,
      type: "error",
    });
  }
});
</script>

<style scoped></style>
