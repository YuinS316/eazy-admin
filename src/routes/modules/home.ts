import { RouteRecordRaw } from "vue-router";
import { HomeRound } from "@vicons/material";

const Layout = () => import("@/layout/index.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/",
    name: "Home",
    meta: {
      key: "Home_entry",
      title: "首页",
      icon: HomeRound
    },
    children: [
      {
        path: "/",
        component: () => import("@/pages/home/index.vue"),
        meta: {
          key: "Home",
          title: "首页",
          icon: HomeRound,
          show: false
        }
      }
    ]
  }
];

export default routes;
