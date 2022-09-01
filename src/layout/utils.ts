import { RouteRecordRaw } from "vue-router";
import  { MenuOption, NIcon } from 'naive-ui'
import { Component } from "vue";
import { RouterLink } from "vue-router";

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function renderRouterLink(route: RouteRecordRaw) {
  return () => h(RouterLink, {
    to: {
      name: route.name,
    }
  }, {default: () => route.meta!.title})
}

export function transformRoutesToMenus(routes: RouteRecordRaw[]):MenuOption[] {
  let list: MenuOption[] = [];

  for (const route of routes) {
    const tmp: MenuOption = {};
    
    tmp.key = route.meta!.key;
    tmp.label = renderRouterLink(route);
    tmp.icon = renderIcon(route.meta!.icon);
    
    if (route.children) {
      tmp.children = transformRoutesToMenus(route.children);
    }

    list.push(tmp);
  }

  return list;
}

export default {};