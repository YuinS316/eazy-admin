import { Recordable } from "@/types/typing";
import { cloneDeep } from "@/utils";
import { defineStore, storeToRefs } from "pinia";
import { useEditorStore } from "./editor";

export const useSnapshotStore = defineStore("snapshot", () => {
  let snapshotData: Array<Recordable[]> = [];
  let snapshotIndex: number = -1;

  const editorStore = useEditorStore();

  //  回退到上一步
  function undo() {
    const { setComponentData } = editorStore;
    if (snapshotIndex >= 0) {
      snapshotIndex--;
      setComponentData(cloneDeep(snapshotData[snapshotIndex]));
    }
  }

  //  前进到下一步
  function redo() {
    const { setComponentData } = editorStore;
    if (snapshotIndex <= snapshotData.length - 1) {
      snapshotIndex++;

      setComponentData(cloneDeep(snapshotData[snapshotIndex]));
    }
  }

  //  记录整个componentData整个状态
  function record() {
    const { componentData } = storeToRefs(editorStore);

    snapshotData[++snapshotIndex] = cloneDeep<Recordable[]>(
      toRaw(componentData.value)
    );

    //  可能会回退再进行新的操作，这时候要把后面的快照清掉
    if (snapshotIndex !== snapshotData.length - 1) {
      snapshotData = snapshotData.slice(0, snapshotIndex + 1);
    }
  }

  return {
    undo,
    redo,
    record
  };
});
