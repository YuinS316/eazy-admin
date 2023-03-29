import type { RouteRecordRaw } from "vue-router";

const importPath = {
  project_root: () => import("@/views/project/index.vue"),
  project_items: () => import("@/views/project/items/index.vue")
};

const editorRoutes: RouteRecordRaw = {
  path: "/editor",
  name: "Editor",
  component: importPath.project_root,
  redirect: "Project_Items",
  children: [
    {
      path: "/project/items",
      name: "Project_Items",
      component: importPath.project_items
    }
  ]
};
export default editorRoutes;
