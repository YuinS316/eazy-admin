<template>
  <div class="mask" v-if="visible">
    <div class="close-icon">
      <n-icon size="40">
        <Close @click="handleClosePreview"></Close>
      </n-icon>
    </div>

    <n-scrollbar :style="canvasContainerStyle" :x-scrollable="true">
      <div class="canvas" :style="getStyle(canvasStyleData)">
        <ComponentWrapper
          v-for="(item, index) in componentData"
          :key="item.id"
          :style="getShapeStyle(item.style)"
        >
          <component
            class="component"
            :style="getComponentStyle(item.style)"
            :is="item.component"
            :id="'component_' + item.id"
            :propValue="item.propValue"
          ></component>
        </ComponentWrapper>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store/editor";
import { Close } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { getStyle, getShapeStyle } from "@/utils/style";
import { Recordable } from "@/types/typing";
import ComponentWrapper from "./ComponentWrapper.vue";
import { CSSProperties } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

//  ======== 遮罩关闭 ===========
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit("update:modelValue", val);
  }
});

function handleClosePreview() {
  visible.value = false;
}
//  ======== 遮罩关闭 ===========

//  ======== 渲染预览组件 ==========
const editorStore = useEditorStore();
const { componentData, canvasStyleData } = storeToRefs(editorStore);

const getComponentStyle = (style: Recordable) => {
  const filterArrs = ["width", "height", "top", "left", "rotate"];
  return getStyle({ ...style }, filterArrs);
};

const canvasContainerStyle = {
  maxWidth: `calc(95% - 40px - 16px)`,
  maxHeight: `calc(100% - 40px - 16px)`
};

//  ======== 渲染预览组件 ==========
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    max-width: calc(95% - 40px - 16px);
    max-height: calc(100% - 40px - 16px);
    background: #fff;
    overflow: auto;
  }
}

.close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
}
</style>
