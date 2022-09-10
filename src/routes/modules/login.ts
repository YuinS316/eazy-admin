import { RouteRecordRaw } from "vue-router";
import { HomeRound } from "@vicons/material";
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login_entry",
    redirect: "/login",
    meta: {
      key: "login_entry",
      title: "登录",
      icon: HomeRound
    },
    children: [
      {
        path: "/login",
        component: () => import("@/pages/login/index.vue"),
        name: "Login",
        meta: {
          key: "Login",
          title: "登录"
          // icon: HomeRound
        }
      },
      {
        path: "/register",
        component: () => import("@/pages/login/register/index.vue"),
        name: "Register",
        meta: {
          key: "Register",
          title: "注册"
          // icon: HomeRound
        }
      }
    ]
  }
];

export default routes;
