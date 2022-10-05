import { RouteRecordRaw } from "vue-router";
import { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";
import { renderIcon } from "@/shared/index";

function renderRouterLink(route: RouteRecordRaw) {
  return () =>
    h(
      RouterLink,
      {
        to: {
          name: route.name
        }
      },
      { default: () => route.meta!.title }
    );
}

export function transformRoutesToMenus(routes: RouteRecordRaw[]): MenuOption[] {
  let list: MenuOption[] = [];

  for (const route of routes) {
    const tmp: MenuOption = {};

    tmp.key = route.meta!.key;
    tmp.label = route.meta!.title;
    tmp.label = renderRouterLink(route);
    tmp.show = route.meta?.show ?? true;

    if (route.meta?.icon) {
      tmp.icon = renderIcon(route.meta!.icon);
    }

    if (route.children && tmp.show) {
      tmp.children = transformRoutesToMenus(route.children);
    } else {
      tmp.label = renderRouterLink(route);
    }

    tmp.show && list.push(tmp);
  }

  return list;
}

export function getRoutesMap(routes: RouteRecordRaw[]) {
  const map = new Map<string, string | null>();

  function buildRoutes(routes: RouteRecordRaw[]) {
    let list = [];
    for (const route of routes) {
      list.push(route);
      if (route.children) {
        for (const child of route.children) {
          child.meta!.parent = route;
        }
        route.children = buildRoutes(route.children);
      }
    }
    return list;
  }

  const routesWithParent = buildRoutes(routes);

  function findAncestor(item: typeof routesWithParent[0]): string {
    if (item.meta!.parent) {
      return findAncestor(item.meta!.parent);
    } else {
      return item.meta!.key;
    }
  }

  function buildMap(list: typeof routesWithParent) {
    for (const item of list) {
      const ancestor = findAncestor(item);
      const key = map.get(item.meta!.key);

      if (key) {
        throw new Error("route出现重复的key-" + key);
      } else {
        //  如果该路由的key跟祖先的key相同，说明是一级的节点
        //  一级节点就设为null
        if (item.meta!.key === ancestor) {
          map.set(item.meta!.key, null);
        } else {
          map.set(item.meta!.key, ancestor);
        }
      }

      if (item.children) {
        buildMap(item.children);
      }
    }
  }

  buildMap(routesWithParent);

  // console.log("map---", map);
  return map;
}

export default {};
