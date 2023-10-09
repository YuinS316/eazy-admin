<template>
  <div
    id="editor"
    class="editor"
    ref="editorRef"
    @contextmenu="handleOpenContextMenu"
    @mousedown="handleMouseDown"
  >
    <n-scrollbar x-scrollable :style="canvasStyle">
      <!-- 网格线 -->
      <Grid></Grid>
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
          :id="'component_' + item.id"
          :propValue="item.propValue"
        ></component>
      </Shape>

      <!-- 右键菜单 -->
      <ContextMenu></ContextMenu>

      <!-- 辅助线 -->
      <MarkLine></MarkLine>

      <!-- 选中区域 -->
      <Area
        :is-show="isShow"
        :start-pos="startPos"
        :width="width"
        :height="height"
      ></Area>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store/editor";
import { useComposeStore } from "@/store/compose";
import { useContextMenuStore } from "@/store/contextMenu";
import { storeToRefs } from "pinia";
import { getStyle, getShapeStyle } from "@/utils/style";
import { Recordable } from "@/types/typing";
import Shape from "./Shape.vue";
import ContextMenu from "./ContxtMenu.vue";
import MarkLine from "./MarkLine.vue";
import Area from "./Area.vue";
import Grid from "./Grid.vue";
import { useCopyStore } from "@/store/copy";
import { useArea } from "@/hooks/useArea";

const editorStore = useEditorStore();
const { componentData, currentComponent, canvasStyleData } =
  storeToRefs(editorStore);

const composeStore = useComposeStore();
const editorRef = ref<HTMLDivElement>();

const { setEditorRef } = composeStore;

const getComponentStyle = (style: Recordable) => {
  const filterArrs = ["width", "height", "top", "left", "rotate"];
  return getStyle({ ...style }, filterArrs);
};

const canvasStyle = computed(() => {
  const result: Recordable = {};
  Object.keys(canvasStyleData.value).forEach(key => {
    result[key] = canvasStyleData.value[key];
    if (["width", "height"].includes(key)) {
      result[key] = canvasStyleData.value[key] + "px";
    }
    if (key === "scale") {
      result[key] = canvasStyleData.value[key] / 100;
    }
  });
  return result;
});

const copyStore = useCopyStore();
const { initKeyboardKeyListener } = copyStore;

let removeKeyboardKeyListener: () => void;

onMounted(() => {
  setEditorRef(editorRef.value!);
  removeKeyboardKeyListener = initKeyboardKeyListener();
  window.$eventBus.on("hideArea", hideArea);
});

onUnmounted(() => {
  removeKeyboardKeyListener();
  window.$eventBus.off("hideArea", hideArea);
});

const contextMenuStore = useContextMenuStore();
const { handleOpenContextMenu } = contextMenuStore;

const { isShow, startPos, width, height, handleMouseDown, hideArea } =
  useArea();
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
