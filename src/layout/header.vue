<script setup lang="ts">
import User from "./components/user.vue";
import Notification from "./components/notification.vue";
</script>

<template>
  <n-layout-header>
    <div class="h-48px bg-[#102041] flex items-center justify-between">
      <div
        class="text-24px w-210px border-r border-r-[hsla(0,0%,100%,.07)] pl-24px h-full flex items-center text-white"
      >
        Eazy Admin
      </div>

      <div class="flex items-center pr-24px">
        <Notification />
        <User />
      </div>
    </div>
  </n-layout-header>
</template>

<style scoped></style>
