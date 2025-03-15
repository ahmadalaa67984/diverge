import { mockUsers } from "../utils/constents";
import { User } from "../utils/interfaces";
import { withAuthCheck } from "../plugin/authInterceptor";

export async function mockFetchUsers(): Promise<User[]> {
  return withAuthCheck(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 500);
    });
  });
}

export function mockDeleteUser(userId: number) {
  return withAuthCheck(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((user) => user.id === userId);
        if (index !== -1) {
          mockUsers.splice(index, 1);
          resolve(true);
        } else {
          reject(new Error("User not found"));
        }
      }, 300);
    });
  });
}

export function mockUpdateUser(user: User) {
  return withAuthCheck(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          mockUsers[index] = user;
          resolve(true);
        } else {
          reject(new Error("User not found"));
        }
      }, 300);
    });
  });
}

export function mockAddUser(user: User) {
  return withAuthCheck(async () => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Check if user already exists
          const userExists = mockUsers.some(
            (existingUser) => existingUser.email === user.email
          );

          if (userExists) {
            reject(new Error("User with this email already exists"));
            return;
          }

          // Assign a unique ID to the new user
          user.id =
            mockUsers.length > 0
              ? Math.max(...mockUsers.map((u) => u.id)) + 1
              : 1;
          user.status = "active";
          user.createdAt = new Date().toISOString().split("T")[0];
          user.profileImage = `https://i.pravatar.cc/150?img=${user.id}`;
          console.log(user);

          mockUsers.push(user);
          resolve(true);
        }, 300);
      });
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to add user"
      );
    }
  });
}

export async function mockFetchUsersByRole(role: string): Promise<User[]> {
  // Simulate fetching users by role
  const allUsers: User[] = [
    // Assuming you have some mock users data here
    { id: 1, name: "Alice", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", role: "User", status: "Inactive" },
    // Add more mock users as needed
  ];

  return allUsers.filter((user) => user.role === role);
}
