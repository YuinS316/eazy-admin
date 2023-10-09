import { Recordable } from "@/types/typing";
import { cloneDeep } from "@/utils";
import { defineStore, storeToRefs } from "pinia";
import { useEditorStore } from "./editor";

type ActionType =
  | "add"
  | "delete"
  | "paste"
  | "moveup"
  | "movedown"
  | "movetop"
  | "movebottom"
  | "clear";

type ActionRecord = {
  //  操作类型
  type: ActionType;
  //  时间戳
  timestamp: number;
  //  操作后的componentData
  value: Recordable[];
};

/**
 * 负责记录每次操作留下的快照
 */
export const useSnapshotStore = defineStore("snapshot", () => {
  const snapshotData = shallowRef<ActionRecord[]>([]);
  const snapshotIndex = ref(-1);

  const editorStore = useEditorStore();
  let hasUndo = false;

  const isUndoEnable = computed(() => snapshotIndex.value >= 0);
  const isRedoEnable = computed(
    () => snapshotIndex.value < snapshotData.value.length && hasUndo
  );

  const actionToTitleMap: { [x in ActionType]: string } = {
    add: "添加组件",
    delete: "删除组件",
    paste: "粘贴组件",
    moveup: "上移",
    movedown: "下移",
    movetop: "置顶",
    movebottom: "置底",
    clear: "重置"
  };

  //  时间旅行，返回到之前的任意一个时刻
  function timeTravel(index: number) {
    snapshotIndex.value = index;

    const { setComponentData } = editorStore;

    setComponentData(
      cloneDeep(snapshotData.value[snapshotIndex.value]?.value || [])
    );
  }

  //  回退到上一步
  function undo() {
    hasUndo = true;
    const { setComponentData } = editorStore;
    if (snapshotIndex.value >= 0) {
      snapshotIndex.value--;
      setComponentData(
        cloneDeep(snapshotData.value[snapshotIndex.value]?.value || [])
      );
    }
  }

  //  前进到下一步
  function redo() {
    const { setComponentData } = editorStore;
    if (snapshotIndex.value <= snapshotData.value.length - 1) {
      snapshotIndex.value++;
      if (snapshotIndex.value === snapshotData.value.length - 1) {
        hasUndo = false;
      }
      setComponentData(
        cloneDeep(snapshotData.value[snapshotIndex.value].value)
      );
    }
  }

  //  记录整个componentData整个状态
  function record(action: ActionType) {
    const { componentData } = storeToRefs(editorStore);

    const actionWrapper: ActionRecord = {
      type: action,
      timestamp: new Date().getTime(),
      value: cloneDeep(toRaw(componentData.value))
    };

    //*  可能会回退再进行新的操作，这时候要把后面的快照清掉
    const list = snapshotData.value.slice(0, snapshotIndex.value + 1);
    list[++snapshotIndex.value] = actionWrapper;
    snapshotData.value = list;
  }

  return {
    undo,
    redo,
    record,
    isUndoEnable,
    isRedoEnable,
    snapshotData,
    actionToTitleMap,
    snapshotIndex,
    timeTravel
  };
});
