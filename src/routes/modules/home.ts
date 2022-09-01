import { RouteRecordRaw } from "vue-router";
import { HomeRound } from "@vicons/material";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/pages/home/index.vue"),
    name: "Home",
    meta: {
      key: "Home",
      title: "首页",
      icon: HomeRound
    }
  }
];

export default routes;