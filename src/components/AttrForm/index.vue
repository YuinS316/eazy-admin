<template>
  <n-tabs default-value="attr" justify-content="space-evenly" type="line">
    <n-tab-pane name="attr" tab="属性">
      <template v-if="currentComponent">
        <n-scrollbar>
          <component :is="currentComponent.component + 'Attr'"></component>
        </n-scrollbar>
      </template>
    </n-tab-pane>
    <n-tab-pane name="animation" tab="动画"> </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store";
import { storeToRefs } from "pinia";

const editorStore = useEditorStore();

const { currentComponent } = storeToRefs(editorStore);
</script>

<style scoped lang="scss">
.n-tabs,
.n-tab-pane {
  height: 100%;
}
</style>
