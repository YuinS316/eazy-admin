<template>
  <div class="scale-controller">
    <n-slider
      v-model:value="canvasStyleData.scale"
      :format-tooltip="formatTooltip"
      v-bind="limitProps"
    />
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";

const editorStore = useEditorStore();
const { canvasStyleData } = storeToRefs(editorStore);

const limitProps = reactive({
  step: 5,
  max: 150,
  min: 50
});

function formatTooltip(value: number) {
  return `${value}%`;
}
</script>

<style scoped lang="scss">
.scale-controller {
  position: fixed;
  bottom: 24px;
  left: 0;
  right: 0;
  width: 200px;
  padding: 8px;
  margin: auto;
  background: var(--grey-color);
  border-radius: 8px;
}
</style>
