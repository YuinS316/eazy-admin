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
      },
      {
        path: "/chart",
        component: () => import("@/pages/comp/chart/index.vue"),
        name: "Chart",
        meta: {
          key: "Chart",
          title: "图表"
          // icon: HomeRound
        }
      },
      {
        path: "/draggable",
        component: () => import("@/pages/comp/draggable/index.vue"),
        name: "Draggable",
        meta: {
          key: "Draggable",
          title: "拖拽组件"
          // icon: HomeRound
        }
      }
    ]
  }
];

export default routes;
