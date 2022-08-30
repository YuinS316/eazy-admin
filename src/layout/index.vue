<script setup lang="ts">
import { CSSProperties } from 'vue';


const sideBarStyle: CSSProperties = {
  height: `calc(100vh - ${23}px)` 
}

const contentStyle: CSSProperties = {
  padding: "16px"
}

</script>


<template>
  <div>
    <n-layout>
      <n-layout-header>header</n-layout-header>

      <n-layout has-sider>
        <n-layout-sider width="210" :native-scrollbar="false" bordered :content-style="sideBarStyle">sider</n-layout-sider>

        <n-layout-content :native-scrollbar="false" bordered embedded :content-style="contentStyle">
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-scrollbar-container) {
  height: calc(100vh - 23px);
}
</style>