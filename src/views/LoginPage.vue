<template>
  <div class="h-screen flex items-center justify-center">
    <form @submit.prevent="submit" class="flex-1 flex flex-col gap-2 max-w-96">
      <p class="py-2 font-bold text-2xl">Login</p>

      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        label="Password"
        type="password"
        variant="outlined"
      ></v-text-field>

      <p v-if="authStore.error" class="text-red-400 text-xs">
        {{ authStore.error }}
      </p>

      <div class="flex flex-col gap-1">
        <v-btn type="submit" :loading="authStore.loading"> Submit </v-btn>
        <p @click="handleForceTest" class="cursor-pointer underline">
          Skip and start test
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../store/authStore"; // Import Pinia store
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import DOMPurify from "dompurify";
import { FieldContext, FormContext } from "vee-validate";
import { onMounted } from "vue";

const authStore = useAuthStore();
const router = useRouter();

// Form validation
const { handleSubmit } = useForm({
  validationSchema: {
    email(value: string) {
      return (
        /^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value) ||
        "Must be a valid e-mail."
      );
    },
    password(value: string) {
      return value ? true : "Enter a password.";
    },
  },
});

const email = useField("email");
const password = useField("password");

const submit = handleSubmit(async () => {
  await authStore.login({
    email: DOMPurify.sanitize(email.value.value as string),
    password: DOMPurify.sanitize(password.value.value as string),
  });

  if (!authStore.error) router.push("/dashboard");
});

const handleForceTest = async () => {
  await authStore.login({
    email: "admin@example.com",
    password: "admin123",
  });
  if (!authStore.error) router.push("/dashboard");
};

onMounted(() => {
  authStore.logout();
});
</script>
