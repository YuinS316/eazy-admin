<template>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :show="visible"
    :options="options"
    :on-clickoutside="handleClickOutSide"
    @select="handleClickContentMenuItem"
  >
  </n-dropdown>
</template>

<script setup lang="ts">
import { useContextMenuStore } from "@/store/contextMenu";
import { storeToRefs } from "pinia";

const contextMenuStore = useContextMenuStore();
const { handleClickContentMenuItem, handleClickOutSide } = contextMenuStore;
const { x, y, visible, options } = storeToRefs(contextMenuStore);
</script>

<style scoped></style>
