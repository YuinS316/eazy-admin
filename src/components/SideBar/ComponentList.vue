<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="box"
      draggable="true"
      :data-index="index"
    >
      <span>{{ item.icon }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ComponentList from "@/material-components/component-list";
const componentList = ref([...ComponentList.filter(item => !item.isHidden)]);

const handleDragStart = (e: DragEvent) => {
  //  配置表中的组件所属序号
  e.dataTransfer?.setData("index", (e.target as HTMLDivElement).dataset.index!);
};
</script>

<style scoped lang="scss">
.component-list {
  padding: 8px;

  .box {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    border: 1px solid #ddd;
    cursor: grab;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
