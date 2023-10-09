import { Recordable } from "@/types/typing";
import { isNumber, isObject, isString } from "@/utils/type";
import { defineStore } from "pinia";
import { swap } from "@/utils/index";
import { useSnapshotStore } from "./snapshot";

interface IShapeStyle {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  rotate?: number;
}

interface ICanvasStyleData {
  width: number;
  height: number;
  scale: number;
  opacity: number;
  background: string;
  [k: string]: any;
}

/**
 * 负责管理在编辑器中的组件
 */
export const useEditorStore = defineStore("editor", () => {
  //  画布中的组件列表
  const componentData = ref<Recordable[]>([]);

  //  记录操作的地方
  const snapshotStore = useSnapshotStore();
  const { record } = snapshotStore;

  //  画布中添加组件
  function addComponentData(component: Recordable, index?: number) {
    if (index !== undefined) {
      componentData.value.splice(index, 0, component);
    } else {
      componentData.value.push(component);
    }

    //  记录操作
    record("add");
  }

  //  设置画布中的组件
  function setComponentData(data: Recordable[]) {
    componentData.value = data;
  }

  //  当前选中的组件
  const currentComponent = ref<Recordable | null>(null);
  //  当前选中的组件的序号
  const currentComponentIndex = ref<number | null>(null);

  //  设置当前组件
  function setCurrentComponent(component: Recordable | null, index: number) {
    currentComponent.value = component;
    currentComponentIndex.value = index;
  }

  //  设置当前组件的样式
  function setShapeStyle(shapeStyle: IShapeStyle) {
    for (const key in shapeStyle) {
      let value = shapeStyle[key as keyof IShapeStyle];

      if (value !== undefined && currentComponent.value) {
        currentComponent.value.style[key] = value;
      }
    }
  }

  //  是否点击了组件
  const isClickComponent = ref(false);
  function setIsClickComponent(status: boolean) {
    isClickComponent.value = status;
  }

  // ======== 删除组件 ===============
  function deleteComponent() {
    if (isNumber(currentComponentIndex.value)) {
      let index = currentComponentIndex.value;
      componentData.value.splice(index, 1);
      currentComponent.value = null;
      //  记录操作
      record("delete");
    }
  }

  // ======== 组件的层级移动 ==========

  //  上移，对于index来说就更加靠后
  function moveUpComponent() {
    if (isNumber(currentComponentIndex.value)) {
      let index = currentComponentIndex.value;
      if (index < componentData.value.length - 1) {
        swap(componentData.value, index, index + 1);
        currentComponentIndex.value = index + 1; //  记录操作
        record("moveup");
      } else {
        window.$message.warning("已经到顶了");
      }
    }
  }

  //  下移
  function moveDownComponent() {
    if (isNumber(currentComponentIndex.value)) {
      let index = currentComponentIndex.value;
      if (index > 0) {
        swap(componentData.value, index, index - 1);
        currentComponentIndex.value = index - 1;
        //  记录操作
        record("movedown");
      } else {
        window.$message.warning("已经到底了");
      }
    }
  }

  //  置顶
  function moveTopComponent() {
    if (isNumber(currentComponentIndex.value)) {
      let index = currentComponentIndex.value;
      let finalIndex = componentData.value.length - 1;
      if (index < finalIndex) {
        componentData.value.splice(index, 1);
        if (currentComponent.value) {
          componentData.value.push(currentComponent.value);
        }
        currentComponentIndex.value = finalIndex; //  记录操作
        record("movetop");
      } else {
        window.$message.warning("已经到顶了");
      }
    }
  }

  //  置底
  function moveBottomComponent() {
    if (isNumber(currentComponentIndex.value)) {
      let index = currentComponentIndex.value;
      let firstIndex = 0;
      if (index > firstIndex) {
        componentData.value.splice(index, 1);
        if (currentComponent.value) {
          componentData.value.unshift(currentComponent.value);
        }
        currentComponentIndex.value = firstIndex;
        //  记录操作
        record("movebottom");
      } else {
        window.$message.warning("已经到底了");
      }
    }
  }

  // ======== 页面布局数据 ========
  const canvasStyleData = ref<ICanvasStyleData>({
    width: 1280,
    height: 900,
    scale: 100,
    opacity: 1,
    background: "#fff"
  });

  function setCanvasStyleData(key: string, val: unknown): void;
  function setCanvasStyleData(value: Recordable, _?: undefined): void;
  function setCanvasStyleData(key: unknown, val: unknown): void {
    if (isObject<ICanvasStyleData>(key)) {
      canvasStyleData.value = key;
    } else if (isString(key)) {
      canvasStyleData.value[key] = val;
    } else {
      throw new Error("设置canvasStyle格式出错");
    }
  }

  return {
    componentData,
    addComponentData,
    setComponentData,
    currentComponent,
    currentComponentIndex,
    setCurrentComponent,
    setShapeStyle,
    canvasStyleData,
    setCanvasStyleData,
    isClickComponent,
    setIsClickComponent,
    moveUpComponent,
    moveDownComponent,
    moveTopComponent,
    moveBottomComponent,
    deleteComponent
  };
});
