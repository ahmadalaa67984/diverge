import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";
import DashboardPage from "../views/DashboardPage.vue";
import LoginPage from "../views/LoginPage.vue";

const routes = [
  { path: "/login", name: "Login", component: LoginPage },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/dashboard", // Remove direct store access here
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard", // Remove direct store access here
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Move authentication check to beforeEach
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/" || to.path === "/:pathMatch(.*)*") {
    next(isAuthenticated ? "/dashboard" : "/login");
  } else {
    next();
  }
});

export default router;
