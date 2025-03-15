import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "../store/userStore";
import {
  mockAddUser,
  mockDeleteUser,
  mockFetchUsers,
  mockUpdateUser,
} from "../api/usersApi";
import { User } from "../utils/interfaces";

// Mock API methods
vi.mock("../api/usersApi", () => ({
  mockFetchUsers: vi.fn(),
  mockDeleteUser: vi.fn(),
  mockUpdateUser: vi.fn(),
  mockAddUser: vi.fn(),
}));

describe("User Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should initialize with the correct default state", () => {
    const userStore = useUserStore();
    expect(userStore.users).toEqual([]);
    expect(userStore.loading).toBe(false);
    expect(userStore.error).toBeNull();
    expect(userStore.loadingAddUser).toBe(false);
    expect(userStore.errorAddUser).toBeNull();
    expect(userStore.successAddUser).toBeNull();
  });

  it("should fetch users successfully", async () => {
    const userStore = useUserStore();
    const mockUsers: User[] = [
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        role: "admin",
        status: "active",
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        role: "manager",
        status: "inactive",
      },
    ];

    mockFetchUsers.mockResolvedValue(mockUsers);

    await userStore.fetchUsers();

    expect(userStore.users).toEqual(mockUsers);
    expect(userStore.loading).toBe(false);
    expect(userStore.error).toBeNull();
  });

  it("should handle errors when fetching users", async () => {
    const userStore = useUserStore();
    mockFetchUsers.mockRejectedValue(new Error("Fetch error"));

    await userStore.fetchUsers();

    expect(userStore.users).toEqual([]);
    expect(userStore.loading).toBe(false);
    expect(userStore.error).toBe("Failed to fetch users.");
  });

  it("should filter users based on search query", async () => {
    const userStore = useUserStore();
    const mockUsers: User[] = [
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        role: "admin",
        status: "active",
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        role: "manager",
        status: "inactive",
      },
    ];

    mockFetchUsers.mockResolvedValue(mockUsers);
    await userStore.fetchUsers("Alice");

    expect(userStore.users).toEqual([
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        role: "admin",
        status: "active",
      },
    ]);
  });

  it("should delete a user successfully", async () => {
    const userStore = useUserStore();
    userStore.users = [
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        role: "admin",
        status: "active",
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        role: "manager",
        status: "inactive",
      },
    ];

    mockDeleteUser.mockResolvedValue(true);
    await userStore.deleteUser(1);

    expect(userStore.users).toEqual([
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        role: "manager",
        status: "inactive",
      },
    ]);
  });

  it("should handle errors when deleting a user", async () => {
    const userStore = useUserStore();
    mockDeleteUser.mockRejectedValue(new Error("Delete failed"));

    await userStore.deleteUser(1);

    expect(userStore.error).toBeInstanceOf(Error);
  });

  it("should update a user successfully", async () => {
    const userStore = useUserStore();
    const updatedUser: User = {
      id: 1,
      name: "Alice Updated",
      email: "alice@example.com",
      role: "admin",
      status: "active",
    };

    mockUpdateUser.mockResolvedValue(true);
    await userStore.updateUser(updatedUser);

    expect(userStore.error).toBeNull();
  });

  it("should handle errors when updating a user", async () => {
    const userStore = useUserStore();
    mockUpdateUser.mockRejectedValue(new Error("Update failed"));

    await userStore.updateUser({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      role: "admin",
      status: "active",
    });

    expect(userStore.error).toBeInstanceOf(Error);
  });

  it("should add a user successfully", async () => {
    const userStore = useUserStore();
    const newUser: User = {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      role: "viewer",
      status: "active",
    };

    mockAddUser.mockResolvedValue(true);
    await userStore.addUser(newUser);

    expect(userStore.successAddUser).toBe(true);
    expect(userStore.errorAddUser).toBeNull();
    expect(userStore.loadingAddUser).toBe(false);
  });

  it("should handle errors when adding a user", async () => {
    const userStore = useUserStore();
    mockAddUser.mockRejectedValue(new Error("Add user failed"));

    await userStore.addUser({
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      role: "viewer",
      status: "active",
    });

    expect(userStore.errorAddUser).toBe("Add user failed");
    expect(userStore.successAddUser).toBeNull();
    expect(userStore.loadingAddUser).toBe(false);
  });
});
