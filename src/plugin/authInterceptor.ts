import { User } from "../utils/interfaces";
import { useAuthStore } from "../store/authStore";
import router from "../router";
// Simulated function to check if the user is authorized
function isAuthorized(): boolean {
  // Implement your actual authorization logic here
  const authStore = useAuthStore();
  console.log(authStore.user);
  return authStore.isAuthenticated;
}

// Function to handle unauthorized access
function handleUnauthorized() {
  // Redirect to login page or handle the error
  console.error("Unauthorized access - redirecting to login page");
  // Assuming there's a router instance you can call to change routes
  router.push("/login");
}

// Middleware function to intercept API calls
export async function withAuthCheck(apiFunction: () => Promise<any>) {
  if (!isAuthorized()) {
    handleUnauthorized();
    return Promise.reject(new Error("Unauthorized"));
  }
  return apiFunction();
}
