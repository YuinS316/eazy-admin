<script setup lang="ts">
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
import App from "./App.vue";
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
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <n-loading-bar-provider>
            <App></App>
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
