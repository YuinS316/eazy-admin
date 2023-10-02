<template>
  <div class="area" v-show="isShow" :style="style"></div>
</template>

<script setup lang="ts">
import { Point } from "@/types/typing";
import { getComponentRotateStyle } from "@/utils/style";

const props = defineProps<{
  isShow: boolean;
  //  左上角的坐标
  startPos: Point;
  width: number;
  height: number;
}>();

const { isShow, startPos, width, height } = toRefs(props);
const style = computed(() => ({
  top: startPos.value.y + "px",
  left: startPos.value.x + "px",
  width: width.value + "px",
  height: height.value + "px"
}));
</script>

<style scoped lang="scss">
.area {
  border: 1px dashed var(--primary-color);
  background: transparent;
  position: absolute;
}
</style>
