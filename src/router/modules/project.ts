import { RoutesEnum } from "@/enums/routes.enum";
import type { RouteRecordRaw } from "vue-router";

const importPath = {
  project_root: () => import("@/views/project/index.vue"),
  project_items: () => import("@/views/project/items/index.vue")
};

const projectRoutes: RouteRecordRaw = {
  path: RoutesEnum.HOME_PATH,
  name: RoutesEnum.HOME_NAME,
  component: importPath.project_root,
  redirect: {
    name: RoutesEnum.HOME_ITEM_NAME
  },
  children: [
    {
      path: RoutesEnum.HOME_ITEM_PATH,
      name: RoutesEnum.HOME_ITEM_NAME,
      component: importPath.project_items
    }
  ]
};
export default projectRoutes;
