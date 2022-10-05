<script setup lang="ts">
import Layout from "@/layout/index.vue";
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
    <!-- <Layout /> -->
    <router-view />
  </n-config-provider>
</template>

<style scoped></style>
