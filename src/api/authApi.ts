// src/api/mockApi.ts

import { mockUsers } from "../utils/constents";

export function mockLogin(email: string, password: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}

export function mockLogout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("authUser");
      resolve(true);
    }, 300);
  });
}

export function getAuthenticatedUser() {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
}
