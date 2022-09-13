<script setup lang="ts">
import { CSSProperties } from "vue";
import SideBar from "./sideBar.vue";
import Header from "./header.vue";
import { useLoadingBar } from "naive-ui";

const contentStyle: CSSProperties = {
  padding: "16px",
  background: "#f0f2f7"
};

const router = useRouter();
const loadingBar = useLoadingBar();

router.beforeEach(() => {
  loadingBar.start();
});

router.afterEach(() => {
  loadingBar.finish();
});
</script>

<template>
  <div>
    <n-layout>
      <Header />

      <n-layout has-sider>
        <side-bar />

        <n-layout-content
          :native-scrollbar="false"
          bordered
          embedded
          :content-style="contentStyle"
        >
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-scrollbar-container) {
  height: calc(100vh - 48px);
}
</style>
