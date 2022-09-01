<script setup lang="ts">
import { routes } from '@/routes';
import { CSSProperties, Component } from 'vue';
import { transformRoutesToMenus } from './utils';

const sideBarStyle: CSSProperties = {
  height: `calc(100vh - ${23}px)`
}

const menuOptions = transformRoutesToMenus(routes);

</script>

<template>
  <n-layout-sider width="210" :native-scrollbar="false" bordered :content-style="sideBarStyle">
    <n-menu :options="menuOptions"></n-menu>
  </n-layout-sider>
</template>



<style scoped>
</style>