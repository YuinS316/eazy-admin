import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from "@/pages/home/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/pages/home/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes 
})

export default router;