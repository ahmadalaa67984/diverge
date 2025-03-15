// src/stores/authStore.ts
import { defineStore } from "pinia";
import { mockLogin, mockLogout, getAuthenticatedUser } from "../api/authApi";
import { mockUsers } from "../utils/constents";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "viewer";
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: getAuthenticatedUser(),
    loading: false,
    error: null,
  }),

  actions: {
    async login({ email, password }: { email: string; password: string }) {
      this.loading = true;
      this.error = null;
      try {
        console.log(email, password);
        const user = await mockLogin(email, password);
        this.user = user as User;
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await mockLogout();
      this.user = null;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role || null,
  },
});
