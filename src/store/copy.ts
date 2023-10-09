import { Recordable } from "@/types/typing";
import { cloneDeep } from "@/utils";
import { generateId } from "@/utils/id";
import { defineStore, storeToRefs } from "pinia";
import { useEditorStore } from "./editor";
import { useSnapshotStore } from "./snapshot";

/**
 * 负责管理组件的复制，粘贴
 */
export const useCopyStore = defineStore("copy", () => {
  const editorStore = useEditorStore();

  const { deleteComponent, addComponentData } = editorStore;

  const { currentComponent, currentComponentIndex } = storeToRefs(editorStore);

  const isActiveComponent = computed(() => currentComponent.value !== null);

  const snapShotStore = useSnapshotStore();
  const { record } = snapShotStore;

  const x = ref(0);
  const y = ref(0);

  //  被复制的组件
  let copiedComponent: { data: Recordable | null; index: number | null } = {
    data: null,
    //  剪切的时候需要这个序号
    index: null
  };

  //  监听快捷键
  function initKeyboardKeyListener() {
    const vKey = "v",
      cKey = "c",
      xKey = "x";
    let isCtrlDown = false;
    const handleKeydown = (e: KeyboardEvent) => {
      //  mac下command对应的是meta
      if (e.key === "Control" || e.key === "Meta") {
        isCtrlDown = true;
      } else if (isCtrlDown && e.key == cKey) {
        copyComponent();
      } else if (isCtrlDown && e.key == vKey) {
        pasteComponent();
      } else if (isCtrlDown && e.key == xKey) {
        cutComponent();
      }
    };

    const handleKeyup = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        isCtrlDown = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      x.value = e.clientX;
      y.value = e.clientY;
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }

  //  复制组件
  function copyComponent() {
    copiedComponent.data = currentComponent.value;
    copiedComponent.index = currentComponentIndex.value;
  }

  //  粘贴组件
  function pasteComponent() {
    if (copiedComponent !== null) {
      let component = cloneDeep(copiedComponent);

      if (component.data !== null) {
        component.data.id = generateId();

        let { left, top } = component.data.style;

        if (isActiveComponent.value === true) {
          component.data.style = {
            ...component.data.style,
            top: top + 10,
            left: left + 10
          };
        } else {
          const editorEl = document.querySelector("#editor")!;
          const editorRect = editorEl.getBoundingClientRect();

          component.data.style = {
            ...component.data.style,
            top: (y.value || 0) - editorRect.y,
            left: (x.value || 0) - editorRect.x
          };
        }

        addComponentData(component.data);
        record("paste");
      }
    }
  }

  //  剪切组件
  function cutComponent() {
    copyComponent();
    deleteComponent();
  }

  return {
    copyComponent,
    cutComponent,
    pasteComponent,
    initKeyboardKeyListener,
    //  提供给vitest做测试
    get _copiedComponent() {
      return copiedComponent;
    }
  };
});
