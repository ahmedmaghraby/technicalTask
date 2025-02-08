import Vue from "vue";
import type { RouteConfig } from "vue-router";
import VueRouter from "vue-router";
import Reservation from "@/views/Reservation.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Reservation",
    component: Reservation,
  },
  {
    path: "/:path(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes,
});

export default router;
