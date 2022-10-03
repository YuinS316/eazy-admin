<script setup lang="ts">
import Layout from "@/layout/index.vue";
import { GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#0560fd",
    primaryColorHover: "#0560fd",
    textColorBase: "#010517",
    borderRadius: "8px"
  }
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <Layout />
  </n-config-provider>
</template>

<style scoped></style>
