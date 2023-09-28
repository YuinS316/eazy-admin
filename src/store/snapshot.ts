import { Recordable } from "@/types/typing";
import { cloneDeep } from "@/utils";
import { defineStore, storeToRefs } from "pinia";
import { useEditorStore } from "./editor";

export const useSnapshotStore = defineStore("snapshot", () => {
  let snapshotData: Array<Recordable[]> = [];
  let snapshotIndex = ref(-1);

  let hasUndo = false;

  const editorStore = useEditorStore();

  const isUndoEnable = computed(() => snapshotIndex.value >= 0);
  const isRedoEnable = computed(
    () => snapshotIndex.value < snapshotData.length && hasUndo
  );

  //  回退到上一步
  function undo() {
    hasUndo = true;

    const { setComponentData } = editorStore;
    if (snapshotIndex.value >= 0) {
      snapshotIndex.value--;
      setComponentData(cloneDeep(snapshotData[snapshotIndex.value]));
    }
  }

  //  前进到下一步
  function redo() {
    const { setComponentData } = editorStore;
    if (snapshotIndex.value <= snapshotData.length - 1) {
      snapshotIndex.value++;

      if (snapshotIndex.value === snapshotData.length - 1) {
        hasUndo = false;
      }

      setComponentData(cloneDeep(snapshotData[snapshotIndex.value]));
    }
  }

  //  记录整个componentData整个状态
  function record() {
    const { componentData } = storeToRefs(editorStore);

    snapshotData[++snapshotIndex.value] = cloneDeep<Recordable[]>(
      toRaw(componentData.value)
    );

    //  可能会回退再进行新的操作，这时候要把后面的快照清掉
    if (snapshotIndex.value !== snapshotData.length - 1) {
      snapshotData = snapshotData.slice(0, snapshotIndex.value + 1);
    }
  }

  return {
    undo,
    redo,
    record,
    isUndoEnable,
    isRedoEnable
  };
});
