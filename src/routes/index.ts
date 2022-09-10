import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeRoutes from "./modules/home";
import LoginRoutes from "./modules/login";
import "vue-router";
import { Component } from "vue";

declare module "vue-router" {
  interface RouteMeta {
    key: string;
    title: string;
    icon?: Component;
    show?: boolean;
    [k: string]: any;
  }
}

export const routes: RouteRecordRaw[] = [...HomeRoutes, ...LoginRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
