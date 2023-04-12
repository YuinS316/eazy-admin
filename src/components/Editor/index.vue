<template>
  <div id="editor" class="editor" ref="editorRef">
    <Shape
      v-for="(item, index) in componentData"
      :index="index"
      :element="item"
      :defaultStyle="item.style"
      :style="getStyle(item.style)"
      :key="item.id"
    >
      <component
        :style="getComponentStyle(item.style)"
        :is="item.component"
        :id="'component' + item.id"
        :propValue="item.propValue"
      ></component>
    </Shape>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store";
import { useComposeStore } from "@/store/compose";
import { storeToRefs } from "pinia";
import { getStyle } from "@/utils/style";
import { Recordable } from "@/types/typing";
import Shape from "./Shape.vue";

const editorStore = useEditorStore();
const { setShapeStyle, setCurrentComponent } = editorStore;
const { componentData, currentComponent } = storeToRefs(editorStore);

const composeStore = useComposeStore();
const editorRef = ref<HTMLDivElement>();

const { setEditorRef } = composeStore;

const getComponentStyle = (style: Recordable) => {
  return getStyle({ ...style, position: "absolute" });
};

const handleMouseDown = (
  e: MouseEvent,
  component: Recordable,
  index: number
) => {
  if (!currentComponent.value) {
    e.preventDefault();
  }

  setCurrentComponent(component, index);

  const pos = { ...component.style };
  const startX = e.clientX;
  const startY = e.clientY;

  const startLeft = +pos.left;
  const startTop = +pos.top;

  const move = (ev: MouseEvent) => {
    const currentX = ev.clientX;
    const currentY = ev.clientY;
    pos.left = currentX - startX + startLeft;
    pos.top = currentY - startY + startTop;

    setShapeStyle(pos);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

onMounted(() => {
  setEditorRef(editorRef.value!);
});
</script>

<style scoped lang="scss">
.editor {
  position: relative;
  background: #fff;
  margin: auto;

  width: 100%;
  height: 100%;
}
</style>
