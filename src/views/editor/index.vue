<template>
  <div class="container">
    <ToolBar></ToolBar>

    <main>
      <!-- 物料库 -->
      <section class="left">
        <ComponentList></ComponentList>
      </section>

      <!-- 画布部分 -->
      <section class="center">
        <div class="content" @dragover="handleDragOver" @drop="handleDrop">
          <Editor></Editor>
        </div>
      </section>

      <!-- 属性设置库 -->
      <section class="right">right</section>
    </main>
  </div>
</template>

<script setup lang="ts">
import ComponentList from "@/components/ComponentList.vue";
import ToolBar from "@/components/ToolBar.vue";
import Editor from "@/components/Editor/index.vue";
import componentList from "@/material-components/component-list";
import { useEditorStore } from "@/store";
import { storeToRefs } from "pinia";
import { cloneDeep } from "lodash-es";
import { useComposeStore } from "@/store/compose";

const editorStore = useEditorStore();
const { addComponentData } = editorStore;

const composeStore = useComposeStore();
const { editorRef } = storeToRefs(composeStore);

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const index = e.dataTransfer?.getData("index");
  const rect = editorRef.value?.getBoundingClientRect();

  const computeComponentPosition = () => {
    let top = 0;
    let left = 0;

    if (rect) {
      top = e.clientY - rect.y;
      left = e.clientX - rect.x;
    }

    return {
      top,
      left
    };
  };

  if (index !== undefined) {
    const component = cloneDeep(componentList[+index]);
    let { top, left } = computeComponentPosition();
    component.style.left = left;
    component.style.top = top;
    addComponentData(component);
  }
};

const handleDragOver = (e: DragEvent) => {
  //  必须加这个，会跟drop冲突
  e.preventDefault();
  e.dataTransfer!.dropEffect = "copy";
};

const handleMouseDown = (e: MouseEvent) => {
  e.stopPropagation();
};
</script>

<style scoped lang="scss">
$container-bg: #fff;

$center-bg: #f5f5f5;
$center-pd: 16px;

$left-width: 184px;

$right-width: 200px;

.container {
  height: 100vh;
  background: #fff;

  main {
    position: relative;
    height: calc(100% - 48px);
    overflow: hidden;

    .left {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: $left-width;
    }

    .center {
      background: $center-bg;
      margin-left: $left-width;
      margin-right: $right-width;
      height: 100%;
      padding: $center-pd;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: $container-bg;
      }
    }

    .right {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: $right-width;
    }
  }
}
</style>
