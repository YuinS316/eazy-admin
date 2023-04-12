import { LayoutMain } from "@/layout/components/LayoutMain";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import modules from "./modules";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    component: LayoutMain,
    redirect: {
      // name: "Project"
      name: "Editor"
    },
    children: [modules.projectRoutes, modules.editorRoutes]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
