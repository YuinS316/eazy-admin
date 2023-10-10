import type { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";
import { defineStore, storeToRefs } from "pinia";
import { useCopyStore } from "./copy";
import { useEditorStore } from "./editor";
import { useSnapshotStore } from "./snapshot";

//  没有选中元素的情况下菜单
const unSelectedOptions = [
  {
    label: "粘贴",
    key: "paste"
  },
  {
    label: "清空剪贴板",
    key: "clearClipBoard"
  },
  {
    label: "清空画布",
    key: "clearCanvas"
  }
];

//  选中元素下的菜单
const selectedOptions = [
  {
    label: "锁定",
    key: "lock"
  },
  {
    label: "删除",
    key: "delete"
  },
  {
    type: "divider",
    key: "d0"
  },
  {
    label: "复制",
    key: "copy"
  },
  {
    label: "粘贴",
    key: "paste"
  },
  {
    label: "剪切",
    key: "cut"
  },
  {
    type: "divider",
    key: "d1"
  },
  {
    label: "置顶",
    key: "moveTop"
  },
  {
    label: "置底",
    key: "moveBottom"
  },
  {
    label: "上移",
    key: "moveUp"
  },
  {
    label: "下移",
    key: "moveDown"
  },
  {
    type: "divider",
    key: "d2"
  },
  {
    label: "清空剪贴板",
    key: "clearClipBoard"
  },
  {
    label: "清空画布",
    key: "clearCanvas"
  }
];

//  右键菜单管理
export const useContextMenuStore = defineStore("contextMenu", () => {
  const editorStore = useEditorStore();

  const {
    moveUpComponent,
    moveDownComponent,
    moveTopComponent,
    moveBottomComponent,
    deleteComponent,
    addComponentData
  } = editorStore;

  const { currentComponent } = storeToRefs(editorStore);

  const snapShotStore = useSnapshotStore();
  const { record } = snapShotStore;

  const copyStore = useCopyStore();
  const { copyComponent, cutComponent, pasteComponent } = copyStore;

  const x = ref(0);
  const y = ref(0);

  const visible = ref(false);

  const options = ref<DropdownMixedOption[]>([]);

  //  选中里面的某一项
  function handleClickContentMenuItem(key: string) {
    switch (key) {
      case "moveUp": {
        moveUpComponent();
        break;
      }

      case "moveDown": {
        moveDownComponent();
        break;
      }

      case "moveTop": {
        moveTopComponent();
        break;
      }

      case "moveBottom": {
        moveBottomComponent();
        break;
      }

      case "delete": {
        deleteComponent();
        break;
      }

      case "copy": {
        copyComponent();
        break;
      }

      case "paste": {
        pasteComponent();
        break;
      }

      case "cut": {
        cutComponent();
      }

      default: {
        break;
      }
    }

    visible.value = false;
  }

  //  打开菜单
  function handleOpenContextMenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    nextTick().then(() => {
      x.value = e.clientX;
      y.value = e.clientY;

      if (currentComponent.value) {
        options.value = selectedOptions;
      } else {
        options.value = unSelectedOptions;
      }
      visible.value = true;
    });
  }

  //  点击菜单外
  function handleClickOutSide() {
    visible.value = false;
  }

  return {
    x,
    y,
    visible,
    options,
    handleClickContentMenuItem,
    handleOpenContextMenu,
    handleClickOutSide
  };
});
