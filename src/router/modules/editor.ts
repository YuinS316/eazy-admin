import type { RouteRecordRaw } from "vue-router";

const importPath = {
  editor_root: () => import("@/views/editor/index.vue")
};

const editorRoutes: RouteRecordRaw = {
  path: "/editor",
  name: "Editor",
  component: importPath.editor_root
  // redirect: "Project_Items",
  // children: [
  //   {
  //     path: "/project/items",
  //     name: "Project_Items",
  //     component: importPath.project_items
  //   }
  // ]
};
export default editorRoutes;
