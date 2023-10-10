<template>
  <div
    class="layer-list"
    :class="{ 'layer-list__empty': !componentData.length }"
  >
    <div
      v-for="item in componentData"
      class="layer-list-item"
      :class="{ 'layer-list-item__active': currentComponent === item }"
      @click="setCurrentComponent(item, currentComponentIndex! + 1)"
    >
      {{ item.label }}
    </div>
    <div v-show="!componentData.length">暂无层级数据</div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";

const editorStore = useEditorStore();
const { componentData, currentComponent, currentComponentIndex } =
  storeToRefs(editorStore);
const { setCurrentComponent } = editorStore;
</script>

<style scoped lang="scss">
.layer-list {
  padding: 8px;
  display: flex;
  flex-direction: column-reverse;
  .layer-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin: 4px;
    cursor: pointer;

    &__active {
      color: var(--primary-color);
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #51d6a9;
        opacity: 0.1;
        border-radius: 4px;
      }
    }
  }

  &__empty {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--font-sub-color);
  }
}
</style>
