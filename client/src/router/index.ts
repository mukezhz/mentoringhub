import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import LoginView from "../views/LoginView.vue";
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
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
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
      name: "Sign-Up",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/landing",
      name: "landing",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LandingView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../layouts/Default.vue"),
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
        } 
      ],
    },
  ],
});

// export default router
