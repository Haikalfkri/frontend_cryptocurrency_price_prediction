import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/auth/login.vue";
import RegisterPage from "../pages/auth/register.vue";
import UserDashboard from "../pages/user/dashboard.vue";
import AdminDashboard from "../pages/admin/dashboard.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/login",
    component: LoginPage,
    name: "LoginPage",
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "RegisterPage",
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/user/dashboard",
    component: UserDashboard,
    meta: { requiresAuth: true, role: "user" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to Check Role
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (to.meta.requiresAuth) {
    if (!token) {
      next("/login"); // Redirect to login if not authenticated
    } else if (to.meta.role && to.meta.role !== role) {
      next("/login"); // Redirect to login if the role doesn't match
    } else {
      next(); // Proceed to the route
    }
  } else {
    next();
  }
});

export default router;