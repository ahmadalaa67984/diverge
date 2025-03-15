import { DirectiveBinding } from "vue";
import { useAuthStore } from "../store/authStore"; // Import store

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore();
    const userRole = authStore.user?.role; // Get current user role

    const allowedRoles = binding.value; // Roles passed as argument

    if (!allowedRoles.includes(userRole)) {
      el.style.display = "none"; // Hide the element if role is not allowed
    }
  },
};
