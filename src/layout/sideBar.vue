<script setup lang="ts">
import { routes } from "@/routes";
import { MenuOption, MenuInst } from "naive-ui";
import { CSSProperties, Component } from "vue";
import { transformRoutesToMenus, getRoutesMap } from "./utils";
import { useDebounceFn } from "@vueuse/core";

const sideBarStyle: CSSProperties = {
  height: `calc(100vh - ${23}px)`,
  background: "#fafbff"
};

const router = useRouter();
const route = useRoute();

const menuOptions = transformRoutesToMenus(routes);

const menuMap = getRoutesMap(routes);

const menuRef = ref<MenuInst | null>(null);

const selectedMenu = ref("");

const expandKeys = ref<string[]>([]);

watch(route, val => {
  selectedMenu.value = val.meta!.key;
  menuRef.value?.showOption(selectedMenu.value);
});

function handleUpdateValue(key: string, item: MenuOption) {
  // console.log("sel--", key, item);
  if (!menuMap.get(key)) {
    expandKeys.value = [];
  }
}

const handleExpanedKeys = useDebounceFn((keys: string[]) => {
  // console.log("expand--", keys);
  expandKeys.value = keys;
});
</script>

<template>
  <n-layout-sider
    width="210"
    :native-scrollbar="false"
    bordered
    :content-style="sideBarStyle"
  >
    <n-menu
      ref="menuRef"
      :accordion="true"
      v-model:value="selectedMenu"
      v-model:expanded-keys="expandKeys"
      :options="menuOptions"
      :root-indent="36"
      :indent="32"
      :on-update:expanded-keys="handleExpanedKeys"
      :on-update:value="handleUpdateValue"
      :expand-icon="() => null"
    ></n-menu>
  </n-layout-sider>
</template>

<style scoped></style>
