import { defineStore } from "pinia";
import type { VNodeRef } from "vue";

export const useComposeStore = defineStore("compose", () => {
  const editorRef = ref<HTMLDivElement>();

  function setEditorRef(value: HTMLDivElement) {
    editorRef.value = value;
  }

  return {
    editorRef,
    setEditorRef
  };
});
