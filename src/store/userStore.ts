// src/store/userStore.ts
import { defineStore } from "pinia";
import {
  mockAddUser,
  mockDeleteUser,
  mockFetchUsers,
  mockUpdateUser,
} from "../api/usersApi";
import { User } from "../utils/interfaces";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as Array<User>,
    loading: false,
    error: null as string | null,
    loadingAddUser: false,
    errorAddUser: null as string | null,
    successAddUser: null as boolean | null,
  }),

  actions: {
    async fetchUsers(searchQuery = "", roleFilter = "", statusFilter = "") {
      this.loading = true;
      this.error = null;
      try {
        let users: User[] = (await mockFetchUsers()) as User[];

        // Simulate search & filtering at API level
        users = users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (roleFilter) {
          users = users.filter((user) => user.role === roleFilter);
        }

        if (statusFilter) {
          users = users.filter((user) => user.status === statusFilter);
        }

        this.users = users;
      } catch (err) {
        this.error = "Failed to fetch users.";
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(userId: number) {
      try {
        await mockDeleteUser(userId);
        this.users = this.users.filter((user) => user.id !== userId);
      } catch (err) {
        this.error = err;
      }
    },

    async updateUser(user: User) {
      try {
        await mockUpdateUser(user);
      } catch (err) {
        this.error = err;
      }
    },

    async addUser(user: User) {
      this.loadingAddUser = true;
      this.errorAddUser = null;
      this.successAddUser = null;

      try {
        await mockAddUser(user);
        this.successAddUser = true;
      } catch (err) {
        this.errorAddUser =
          err instanceof Error ? err.message : "An error occurred";
      } finally {
        this.loadingAddUser = false;
      }
    },
  },
});
