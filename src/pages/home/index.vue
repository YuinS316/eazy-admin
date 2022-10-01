<script setup lang="ts">
import { HomeFilled } from "@vicons/material";
</script>

<template>
  <div class="">
    <n-icon>
      <HomeFilled />
    </n-icon>
    <div v-for="item in 1000" :key="item">home - {{ item }}</div>
  </div>
</template>

<style scoped></style>
