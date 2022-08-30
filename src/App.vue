<script setup lang="ts">
import Layout from "@/layout/index.vue";
import { GlobalThemeOverrides } from "naive-ui";

const themeOverrides:GlobalThemeOverrides = {}

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <Layout />
  </n-config-provider>
</template>

<style scoped></style>
