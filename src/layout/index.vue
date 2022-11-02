<script setup lang="ts">
import { CSSProperties } from "vue";
import SideBar from "./sideBar.vue";
import Header from "./header.vue";
// import { useLoadingBar } from "naive-ui";
import NProgress from "@/shared/nprogress";

const contentStyle: CSSProperties = {
  padding: "16px",
  backgroundColor: "#f0f2f7"
};

const router = useRouter();

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
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
          :content-style="contentStyle"
        >
          <router-view></router-view>
          <n-back-top :right="30" />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-scrollbar-container) {
  height: calc(100vh - 48px);
}

:deep(.n-layout-content) {
  background-color: #f0f2f7;
}
</style>
