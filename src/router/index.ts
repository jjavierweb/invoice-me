import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InvoiceView from "@/views/InvoiceView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFound from "@/components/NotFound.vue";

// firebase
import { auth } from "@/firebase/config";

const requireAuth = (to: any, from: any, next: any) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/invoice/:id",
    name: "invoice",
    component: InvoiceView,
    beforeEnter: requireAuth,
  },
  // 404 route
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
