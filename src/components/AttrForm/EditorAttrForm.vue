<template>
  <div class="editor-form">
    <div class="editor-form-header">画布属性</div>
    <n-divider style="margin-top: 8px; margin-bottom: 8px" />

    <div class="editor-form-body">
      <n-form>
        <n-form-item key="width" label="画布宽度">
          <n-input-number
            v-model:value="canvasStyleData.width"
          ></n-input-number>
        </n-form-item>

        <n-form-item key="height" label="画布高度">
          <n-input-number
            v-model:value="canvasStyleData.height"
          ></n-input-number>
        </n-form-item>

        <n-form-item key="height" label="画布背景">
          <n-color-picker
            v-model:value="canvasStyleData.background"
            :actions="['clear']"
          ></n-color-picker>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";

const editorStore = useEditorStore();
const { canvasStyleData } = storeToRefs(editorStore);
</script>

<style scoped lang="scss">
.editor-form {
  .editor-form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
  }

  .editor-form-body {
    padding: 8px 16px;
  }

  :deep(.n-form-item-blank) {
    & > div {
      width: 100%;
    }
  }
}
</style>
