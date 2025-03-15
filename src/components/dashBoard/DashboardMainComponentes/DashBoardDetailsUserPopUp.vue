<template>
  <v-dialog v-model="props.show" persistent max-width="400px">
    <v-card>
      <v-card-text class="d-flex flex-column align-start">
        <v-avatar size="100">
          <v-img :src="user?.profileImage" cover></v-img>
        </v-avatar>
        <v-card-title class="text-h5 text-start">{{ user?.name }}</v-card-title>

        <v-list dense>
          <v-list-item>
            <v-icon color="primary">mdi-email</v-icon>
            <v-list-item-title class="font-weight-bold text-start"
              >Email</v-list-item-title
            >
            <div class="d-flex align-center">
              <v-list-item-subtitle class="text-start">{{
                user?.email
              }}</v-list-item-subtitle>
              <v-btn icon @click="copyToClipboard(user?.email)">
                <v-icon v-if="copied" color="green">mdi-check</v-icon>
                <v-icon v-else color="grey">mdi-content-copy</v-icon>
              </v-btn>
            </div>
          </v-list-item>
          <v-list-item>
            <v-icon color="primary">mdi-account</v-icon>
            <v-list-item-title class="font-weight-bold text-start"
              >Role</v-list-item-title
            >
            <v-list-item-subtitle class="text-start">{{
              user?.role
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon color="primary">mdi-calendar</v-icon>
            <v-list-item-title class="font-weight-bold text-start"
              >Joined</v-list-item-title
            >
            <v-list-item-subtitle class="text-start">{{
              formatDate(user?.createdAt)
            }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useClipboard } from "../../../composables/useClipboard";
import { formatDate } from "../../../utils/helperFunctions";

const { copied, copyToClipboard } = useClipboard();

const props = defineProps({
  show: Boolean,
  user: Object,
});

defineEmits(["close"]);
</script>
