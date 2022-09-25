import { RouteRecordRaw } from "vue-router";
import { HomeRound } from "@vicons/material";
const routes: RouteRecordRaw[] = [
  {
    path: "/component",
    name: "component_entry",
    redirect: "/table",
    meta: {
      key: "component_entry",
      title: "组件",
      icon: HomeRound
    },
    children: [
      {
        path: "/table",
        component: () => import("@/pages/comp/table/index.vue"),
        name: "Table",
        meta: {
          key: "Table",
          title: "表格"
          // icon: HomeRound
        }
      }
      // {
      //   path: "/register",
      //   component: () => import("@/pages/login/register/index.vue"),
      //   name: "Register",
      //   meta: {
      //     key: "Register",
      //     title: "注册"
      //     // icon: HomeRound
      //   }
      // }
    ]
  }
];

export default routes;
