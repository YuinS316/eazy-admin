<template>
  <div class="shape" @mousedown="handleMouseDownOnShape($event)">
    <template v-if="active">
      <div
        v-for="item in points"
        class="shape-point"
        :key="item"
        :style="pointStylesMap[item]"
        @mousedown="handleMouseDownOnShapePoint(item, $event)"
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

//  选中了组件，需要进行移动
const handleMouseDownOnShape = (e: MouseEvent) => {
  // if (!currentComponent.value) {
  //   e.preventDefault();
  // }

  setIsClickComponent(true);

  e.stopPropagation();
  e.preventDefault();

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

//  点击那些圆点，表示要拉伸或缩放，需要计算
const handleMouseDownOnShapePoint = (point: string, e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();

  const position = { ...defaultStyle.value };

  const { height, width, top, left } = position;

  //  记录鼠标的位置
  const startX = e.clientX;
  const startY = e.clientY;

  const move = (moveEvent: MouseEvent) => {
    let currentX = moveEvent.clientX;
    let currentY = moveEvent.clientY;

    let diffX = currentX - startX;
    let diffY = currentY - startY;

    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);

    //  判断一下是操作的哪个点
    //  举个例子，操作的下面的点，然后是向下拉的，diffY为+，h增加。
    //  如果是上面的点往下拉，diff为+,h减少；但是如果它越过了下面的点，h设为0

    const newHeight = height + (hasT ? -diffY : hasB ? diffY : 0);
    const newWidth = width + (hasL ? -diffX : hasR ? diffX : 0);

    position.height = newHeight > 0 ? newHeight : 0;
    position.width = newWidth > 0 ? newWidth : 0;

    if (hasT && Math.abs(diffY) > height) {
      //  如果不加这个判断，会导致从上面的三个圆点往下拉，超过高度之后会推着组件走
    } else {
      position.top = top + (hasT ? diffY : 0);
    }

    if (hasL && Math.abs(diffX) > width) {
    } else {
      position.left = left + (hasL ? diffX : 0);
    }

    setShapeStyle(position);
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
