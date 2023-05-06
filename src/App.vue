<script setup lang="ts">
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
const theme = ref<GlobalTheme | null>(null);

const themeOverride = ref<GlobalThemeOverrides | null>(null);
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="theme"
    :theme-overrides="themeOverride"
  >
    <RouterView></RouterView>
  </n-config-provider>
</template>

<style scoped></style>
