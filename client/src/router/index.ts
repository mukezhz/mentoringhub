import { checkVerified } from "@/utils/account/checkVerified";
import { createRouter, createWebHistory, routerKey } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import PageNotFound from "@/views/404.vue";
import LandingView from "@/views/LandingView.vue";
import DashboardView from "../views/DashboardView.vue";
import MentorView from "@/views/MentorView.vue";
import RecommendedMentor from "@/views/RecommendMentor.vue"
import MenteeView from "@/views/MenteeView.vue";
import RoomView from "@/views/RoomView.vue";
import ApplicationView from "@/views/ApplicationView.vue";
import ApplicationDetails from "@/views/ApplicationDetails.vue"
import { regenerateTokenFromRefreshToken } from "@/utils/auth/refreshToken";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // will match everything
      path: "/:pathMatch(.*)*",
      name: "Error Page",
      component: PageNotFound,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/activate/:token",
      name: "Activate Account",
      component: () => import("../views/ActivateAccount.vue"),
    },
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
      path: "/signup",
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
      component: DefaultLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/u/:username",
          name: "dynamic profile",
          component: () => import("../views/UserProfile.vue"),
        },
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
          path: "/recom",
          name: "recommend mentor",
          component: RecommendedMentor,
        },
        {
          path: "/mentee",
          name: "/mentee",
          component: MenteeView,
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
        {
          path: "/applicationdetails",
          name: "details application",
          component: ApplicationDetails,
        },
        {
          path: "/profile",
          name: "User Profile",
          component: () => import("../views/UserProfile.vue"),
        },
        {
          path: "/create-profile",
          name: "Create Profile",
          component: () => import("../views/CreateProfile.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/settings",
          name: "User Settings",
          component: () => import("../views/UserSettings.vue"),
        },
        {
          path: "/premeet",
          name: "premeet",
          component: () => import("../views/PreMeetView.vue"),
        },
        {
          path: "/meet",
          name: "meet",
          component: () => import("../views/MeetView.vue"),
        },
      ],
    },
  ],
});

// export default router
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("authtoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  if (token?.length) {
    const isVerified = await checkVerified(token);
    if (!isVerified) {
      if (await regenerateTokenFromRefreshToken(refreshToken || "")) next();
      next("/login");
    }
    localStorage.setItem("isverified", isVerified ? "1" : "");
  }

  if (!token && to.meta.requiresAuth) next("/login");
  if (token?.length && to.name === "login") next("/dashboard");
  else if (token?.length && to.name === "home") next("/dashboard");
  else if (token?.length && to.name === "signup") next("/dashboard");
  else next();
});
