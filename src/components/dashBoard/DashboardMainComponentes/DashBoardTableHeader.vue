<template>
  <div>
    <v-text-field
      v-model="search"
      :label="$t('search')"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
      data-testid="search-input"
    ></v-text-field>

    <div class="d-flex">
      <v-select
        v-model="selectedFilter"
        :items="translatedRolesOptions"
        :label="$t('filterByRole')"
        class="mt-2 me-2"
        return-object
        item-text="title"
        item-value="value"
      ></v-select>

      <v-select
        v-model="selectedStatus"
        :items="translatedStatusOptions"
        :label="$t('filterByStatus')"
        class="mt-2"
        return-object
        item-text="title"
        item-value="value"
      ></v-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import _ from "lodash";
import { rolesFilterOptions, statusOptions } from "../../../utils/constents";
import { useUserStore } from "../../../store/userStore";
import { FilterOption } from "../../../utils/interfaces";
import { useI18n } from "vue-i18n";

const search = ref<string>("");
const selectedFilter = ref<FilterOption | null>(null);
const selectedStatus = ref<FilterOption | null>(null);
const userStore = useUserStore();
const { t } = useI18n();

const translatedRolesOptions = rolesFilterOptions.map((option) => ({
  ...option,
  title: t(option.title),
}));
const translatedStatusOptions = statusOptions.map((option) => ({
  ...option,
  title: t(option.title),
}));

const debouncedFetchUsers = _.debounce(
  (searchValue, filterValue, statusValue) => {
    userStore.fetchUsers(searchValue, filterValue, statusValue);
  },
  300
);

watchEffect(() => {
  debouncedFetchUsers(
    search.value,
    selectedFilter.value?.value || "",
    selectedStatus.value?.value || ""
  );
});
</script>
