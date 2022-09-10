<script setup lang="ts">
import Layout from "@/layout/index.vue";
import { GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <Layout />
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped></style>
