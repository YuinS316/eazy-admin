<template>
  <div class="toolbar">
    <div>
      <n-button :disabled="!isUndoEnable" @click="undo"> {{ "<" }} </n-button>
      <n-button :disabled="!isRedoEnable" @click="redo"> {{ ">" }} </n-button>
      <n-button @click="resetData"> 清空</n-button>
      <n-button @click="handleOpenPreview"> 预览 </n-button>
      <n-button @click="saveData"> 保存 </n-button>
      <n-button @click="loadData"> 加载 </n-button>
    </div>
  </div>
  <!-- 预览 -->
  <Preview v-model="previewVisible"></Preview>
</template>

<script setup lang="ts">
import { useSnapshotStore } from "@/store/snapshot";
import Preview from "./Preview/index.vue";
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";
import { LocalStore } from "@/utils/store";
import { cloneDeep } from "@/utils/index";
import { Recordable } from "@/types/typing";

const snapshotStore = useSnapshotStore();
const { isUndoEnable, isRedoEnable } = storeToRefs(snapshotStore);
const { undo, redo } = snapshotStore;

const editorStore = useEditorStore();
const { setComponentData, setCanvasStyleData } = editorStore;
const { componentData, canvasStyleData } = storeToRefs(editorStore);

//  ==========  预览 ==========
const previewVisible = ref(false);
function handleOpenPreview() {
  previewVisible.value = true;
}
//  ==========  预览 ==========

//  ==========  清空 ==========
function resetData() {
  setComponentData([]);
  setCanvasStyleData({});
}
//  ==========  清空 ==========

//  ==========  保存 & 加载 ==========
const componentDataKey = "componentData";
const canvasStyleDataKey = "canvasStyleData";

const localStore = new LocalStore("editor");
function saveData() {
  try {
    const copyComponentData = cloneDeep(componentData.value);
    const copyCanvasStyleData = cloneDeep(canvasStyleData.value);

    localStore.setItem(componentDataKey, copyComponentData);
    localStore.setItem(canvasStyleDataKey, copyCanvasStyleData);

    window.$message.success("保存成功");
  } catch (error) {
    window.$message.error("保存失败");
    console.error("[save data error]: ", error);
  }
}

function loadData() {
  const componentCacheData = localStore.getItem(
    componentDataKey
  ) as Recordable[];
  const canvasCacheData = localStore.getItem(canvasStyleDataKey) as Recordable;

  if (componentCacheData) {
    setComponentData(componentCacheData);
  }
  if (canvasCacheData) {
    setCanvasStyleData(canvasCacheData);
  }

  if (!componentCacheData && !canvasCacheData) {
    window.$message.warning("暂无保存的数据，无法加载");
  } else {
    window.$message.success("加载成功");
  }
}
//  ==========  保存 & 加载 ==========
</script>

<style scoped lang="scss">
$border-color: rgb(239, 239, 245);
.toolbar {
  height: 48px;
  display: flex;
  align-items: center;
  // justify-content: center;

  padding: 0 16px;
  border-bottom: 1px solid $border-color;
}
</style>
