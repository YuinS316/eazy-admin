import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Component } from "vue";
import "vue-router";
import HomeRoutes from "./modules/home";
import LoginRoutes from "./modules/login";
import ComponentRoutes from "./modules/comp";
declare module "vue-router" {
  interface RouteMeta {
    key: string;
    title: string;
    icon?: Component;
    show?: boolean;
    [k: string]: any;
  }
}

export const routes: RouteRecordRaw[] = [
  ...HomeRoutes,
  ...LoginRoutes,
  ...ComponentRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  console.log("to--", to);
  console.log("from--", from);
});

export default router;
