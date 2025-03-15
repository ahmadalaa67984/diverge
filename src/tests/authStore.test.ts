import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "../store/authStore";
import { mockLogin, mockLogout } from "../api/authApi";

// Mock API methods
vi.mock("../api/authApi", () => ({
  mockLogin: vi.fn(),
  mockLogout: vi.fn(),
  getAuthenticatedUser: () => null,
}));

describe("Auth Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should initialize with correct default state", () => {
    const authStore = useAuthStore();
    expect(authStore.user).toBeNull();
    expect(authStore.loading).toBe(false);
    expect(authStore.error).toBeNull();
  });

  it("should login successfully and update state", async () => {
    const authStore = useAuthStore();
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    };

    mockLogin.mockResolvedValue(mockUser);

    await authStore.login({
      email: "john@example.com",
      password: "password123",
    });

    expect(authStore.user).toEqual(mockUser);
    expect(authStore.loading).toBe(false);
    expect(authStore.error).toBeNull();
  });

  it("should set error on failed login", async () => {
    const authStore = useAuthStore();
    const errorMessage = "Invalid credentials";

    mockLogin.mockRejectedValue(new Error(errorMessage));

    await authStore.login({
      email: "wrong@example.com",
      password: "wrongpass",
    });

    expect(authStore.user).toBeNull();
    expect(authStore.loading).toBe(false);
    expect(authStore.error).toBe(errorMessage);
  });

  it("should logout and clear user state", async () => {
    const authStore = useAuthStore();
    authStore.user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    };

    await authStore.logout();

    expect(authStore.user).toBeNull();
    expect(mockLogout).toHaveBeenCalled();
  });

  it("should return correct authentication status", () => {
    const authStore = useAuthStore();
    expect(authStore.isAuthenticated).toBe(false);

    authStore.user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    };
    expect(authStore.isAuthenticated).toBe(true);
  });

  it("should return the correct user role", () => {
    const authStore = useAuthStore();
    expect(authStore.userRole).toBeNull();

    authStore.user = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "manager",
    };
    expect(authStore.userRole).toBe("manager");
  });
});
