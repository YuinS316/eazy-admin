<template>
  <div>
    <!-- <n-layout has-sider position="absolute">
      <n-space vertical>侧边栏</n-space>

      <n-layout>
        <n-layout-header bordered>
          <header>头部</header>
        </n-layout-header>
        <n-layout
          class="content-top"
          position="absolute"
          :native-scrollbar="false"
        >
          <n-layout-content>
            <RouterView></RouterView>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-layout> -->
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
</script>

<style lang="scss" scoped>
.content-top {
  top: 60px;
}
</style>
