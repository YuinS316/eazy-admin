<template>
  <div class="shape" @mousedown="handleMouseDownOnShape($event)">
    <template v-if="active">
      <div
        v-for="item in points"
        class="shape-point"
        :key="item"
        :style="pointStylesMap[item]"
      ></div>
    </template>
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
  active: boolean;
}>();

const { element, defaultStyle, index, active } = toRefs(props);

const editorStore = useEditorStore();
const { setShapeStyle, setCurrentComponent, setIsClickComponent } = editorStore;
const { componentData, currentComponent } = storeToRefs(editorStore);

const composeStore = useComposeStore();
const editorRef = ref<HTMLDivElement>();

const { setEditorRef } = composeStore;

const handleMouseDownOnShape = (e: MouseEvent) => {
  // if (!currentComponent.value) {
  //   e.preventDefault();
  // }

  setIsClickComponent(true);

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

//  ========  点位 =========
const points = ref(["lt", "lb", "rt", "rb", "t", "r", "b", "l"]);

const pointStylesMap = computed(() => {
  let map: Recordable = {};
  points.value.forEach(point => {
    map[point] = getPointStyle(point);
  });
  return map;
});

const getPointStyle = (point: string) => {
  const { defaultStyle } = toRefs(props);

  const hasT = /t/.test(point);
  const hasB = /b/.test(point);
  const hasL = /l/.test(point);
  const hasR = /r/.test(point);

  let width = defaultStyle.value.width;
  let height = defaultStyle.value.height;

  let x = width / 2;
  let y = height / 2;

  if (hasT) {
    y = 0;
  }
  if (hasB) {
    y = height;
  }
  if (hasL) {
    x = 0;
  }
  if (hasR) {
    x = width;
  }

  const style = {
    left: x + "px",
    top: y + "px"
  };

  return style;
};
</script>

<style scoped lang="scss">
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }

  &__active {
    outline: 1px solid var(--primary-color);
  }

  &-point {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    border: 1px solid var(--primary-color);
    border-radius: 50%;
    margin: -4px 0 0 -4px;
  }
}
</style>
