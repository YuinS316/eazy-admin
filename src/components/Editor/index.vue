<template>
  <div
    id="editor"
    class="editor"
    ref="editorRef"
    @contextmenu="handleOpenContextMenu"
  >
    <Shape
      v-for="(item, index) in componentData"
      :class="{ shape__active: currentComponent === item }"
      :active="currentComponent === item"
      :index="index"
      :element="item"
      :defaultStyle="item.style"
      :style="getShapeStyle(item.style)"
      :key="item.id"
    >
      <component
        class="component"
        :style="getComponentStyle(item.style)"
        :is="item.component"
        :id="'component' + item.id"
        :propValue="item.propValue"
      ></component>
    </Shape>
    <ContextMenu></ContextMenu>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store";
import { useComposeStore } from "@/store/compose";
import { useContextMenuStore } from "@/store/contextMenu";
import { storeToRefs } from "pinia";
import { getStyle, getShapeStyle } from "@/utils/style";
import { Recordable } from "@/types/typing";
import Shape from "./Shape.vue";
import ContextMenu from "./ContxtMenu.vue";

const editorStore = useEditorStore();
const { componentData, currentComponent } = storeToRefs(editorStore);

const composeStore = useComposeStore();
const editorRef = ref<HTMLDivElement>();

const { setEditorRef } = composeStore;

const getComponentStyle = (style: Recordable) => {
  const filterArrs = ["width", "height", "top", "left", "rotate"];
  return getStyle({ ...style }, filterArrs);
};

onMounted(() => {
  setEditorRef(editorRef.value!);
});

const contextMenuStore = useContextMenuStore();
const { handleOpenContextMenu } = contextMenuStore;
</script>

<style scoped lang="scss">
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  width: 100%;
  height: 100%;

  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
