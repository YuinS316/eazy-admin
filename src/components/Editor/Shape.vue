<template>
  <div
    class="shape"
    ref="componentRef"
    @mousedown="handleMouseDownOnShape($event)"
  >
    <template v-if="active">
      <div class="shape-rotate-icon" @mousedown="handleRotate">
        <n-icon size="20" color="var(--primary-color)">
          <RefreshSharp></RefreshSharp>
        </n-icon>
      </div>
      <div
        v-for="item in points"
        class="shape-point"
        :key="item"
        :style="pointStylesMap[item]"
        @mousedown="handleMouseDownOnShapePointV2(item, $event)"
      ></div>
    </template>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { RefreshSharp } from "@vicons/ionicons5";
import { useEditorStore } from "@/store/editor";
import { useComposeStore } from "@/store/compose";
import { Recordable } from "@/types/typing";
import { getStyle } from "@/utils/style";
import { storeToRefs } from "pinia";
import { calculatePositionAndSize } from "@/utils/calculatePosition";

const props = defineProps<{
  //  数据结构
  element: Recordable;
  //  初始样式
  defaultStyle: Recordable;
  //  在componentData中的序号
  index: number;
  //  是否是在编辑状态
  active: boolean;
}>();

const { element, defaultStyle, index, active } = toRefs(props);

const editorStore = useEditorStore();
const { setShapeStyle, setCurrentComponent, setIsClickComponent } = editorStore;
const { componentData, currentComponent } = storeToRefs(editorStore);

const composeStore = useComposeStore();
const { editorRef } = storeToRefs(composeStore);
const componentRef = ref<HTMLDivElement>();

//  ======== 组件移动 ==========

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
    window.$eventBus.emit("move", currentY - startY > 0, currentX - startX > 0);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    //  通知辅助线移动停止了，可以关闭
    window.$eventBus.emit("stopMove");
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

//  ======== 组件移动 ==========

//  ======== 旋转 =============

function getDegreeByPoint(y: number, x: number) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

const handleRotate = (e: MouseEvent) => {
  setIsClickComponent(true);

  e.stopPropagation();
  e.preventDefault();

  setCurrentComponent(element.value, index.value);

  const pos = { ...defaultStyle.value };

  const originDegree = pos.rotate;

  const { left, top, width, height } =
    componentRef.value!.getBoundingClientRect();

  //  组件的中心位置
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  //  点击的起始位置
  const startX = e.clientX;
  const startY = e.clientY;

  //  起始的偏转角度
  const startDegree = getDegreeByPoint(startY - centerY, startX - centerX);

  const move = (ev: MouseEvent) => {
    const currentX = ev.clientX;
    const currentY = ev.clientY;

    const endDegree = getDegreeByPoint(currentY - centerY, currentX - centerX);
    pos.rotate = Math.floor(originDegree + endDegree - startDegree);
    setShapeStyle(pos);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

//  ======== 旋转 =============

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

//  带有旋转后的计算
const handleMouseDownOnShapePointV2 = (point: string, e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();

  const style = { ...defaultStyle.value };

  const { height, width, top, left } = style;

  //  宽高比
  const proportion = width / height;

  let isLockProportion = false;

  if (props.element.component === "EzGroup") {
    isLockProportion = true;
  }

  //  中心点
  const centerPoint = {
    x: left + width / 2,
    y: top + height / 2
  };

  //  画布的位置信息
  const canvasRect = editorRef.value!.getBoundingClientRect();

  //  当前点击的圆点的位置信息
  const pointRect = (e.target as HTMLDivElement).getBoundingClientRect();

  // 当前点击圆点相对于画布的中心坐标
  const currentPoint = {
    x: pointRect.left - canvasRect.left + pointRect.width / 2,
    y: pointRect.top - canvasRect.top + pointRect.height / 2
  };

  //  获取对称点的信息
  const symmetricPoint = {
    x: centerPoint.x + (centerPoint.x - currentPoint.x),
    y: centerPoint.y + (centerPoint.y - currentPoint.y)
  };

  let isFirst = true;
  const move = (ev: MouseEvent) => {
    // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
    // 因此第一次点击时不触发 move 事件
    if (isFirst) {
      isFirst = false;
      return;
    }

    const currentPosition = {
      x: ev.clientX - canvasRect.left,
      y: ev.clientY - canvasRect.top
    };

    // debugger;

    calculatePositionAndSize(point, style, proportion, isLockProportion, {
      centerPoint,
      currentPoint,
      symmetricPoint,
      currentPosition
    });

    setShapeStyle(style);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};

//  ========  点位 =========
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

  &-rotate-icon {
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, 0);
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
