<script setup lang="ts">
import { GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#0560fd",
    primaryColorHover: "rgba(5,96,253, 0.8)",
    textColorBase: "#010517",
    borderRadius: "8px"
  }
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-notification-provider>
        <router-view />
      </n-notification-provider>
    </n-message-provider>
    <!-- <Layout /> -->
  </n-config-provider>
</template>

<style scoped></style>
