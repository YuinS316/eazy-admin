<template>
  <RouterView>
    <template #default="{ Component, route }">
      <component :is="Component" :key="route.fullPath"></component>
    </template>
  </RouterView>
</template>

<script setup lang="ts"></script>

<style scoped></style>
