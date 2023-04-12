<template>
  <div class="shape" @mousedown="handleMouseDown($event)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store";
import { useComposeStore } from "@/store/compose";
import { Recordable } from "@/types/typing";
import { getStyle } from "@/utils/style";
import { storeToRefs } from "pinia";

const props = defineProps<{
  element: Recordable;
  defaultStyle: Recordable;
  index: number;
}>();

const { element, defaultStyle, index } = toRefs(props);

const editorStore = useEditorStore();
const { setShapeStyle, setCurrentComponent } = editorStore;
const { componentData, currentComponent } = storeToRefs(editorStore);

const composeStore = useComposeStore();
const editorRef = ref<HTMLDivElement>();

const { setEditorRef } = composeStore;

const handleMouseDown = (e: MouseEvent) => {
  // if (!currentComponent.value) {
  //   e.preventDefault();
  // }

  e.stopPropagation();

  setCurrentComponent(element.value, index.value);

  const pos = { ...defaultStyle.value };
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
</script>

<style scoped lang="scss">
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}
</style>
