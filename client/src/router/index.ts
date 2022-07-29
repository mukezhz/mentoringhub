import { createRouter, createWebHistory, routerKey } from "vue-router";
import LandingView from "../views/LandingView.vue";
import DashboardView from "../views/DashboardView.vue";
import MentorView from "@/views/MentorView.vue";
import RoomView from "@/views/RoomView.vue";
import ApplicationView from "../views/ApplicationView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/sign-up",
      name: "signup",
      component: () => import("../views/SignUpView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/landing",
      name: "landing",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LandingView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../layouts/Default.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "/mentor",
          name: "mentor",
          component: MentorView,
        },
        {
          path: "/room",
          name: "room",
          component: RoomView,
        },
        {
          path: "/application",
          name: "application",
          component: ApplicationView,
        },
      ],
    },
  ],
});

// export default router
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  // token needs to be verified by the server
  if ((!token || !token.length) && to.meta.requiresAuth) next("/login");
  next()
});
