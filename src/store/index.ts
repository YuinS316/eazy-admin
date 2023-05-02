import { Recordable } from "@/types/typing";
import { isObject, isString } from "@/utils/type";
import { createPinia, defineStore } from "pinia";
import type { App } from "vue";

const pinia = createPinia();

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
  color: string;
  opacity: number;
  background: string;
  fontSize: number;
  [k: string]: any;
}

export const useEditorStore = defineStore("editor", () => {
  //  画布中的组件列表
  const componentData = ref<Recordable[]>([]);

  function addComponentData(component: Recordable, index?: number) {
    if (index !== undefined) {
      componentData.value.splice(index, 0, component);
    } else {
      componentData.value.push(component);
    }
  }

  //  当前选中的组件
  const currentComponent = ref<Recordable | null>(null);
  const currentComponentIndex = ref<number | null>(null);

  function setCurrentComponent(component: Recordable, index: number) {
    currentComponent.value = component;
    currentComponentIndex.value = index;
  }

  function setShapeStyle(shapeStyle: IShapeStyle) {
    for (const key in shapeStyle) {
      let value = shapeStyle[key as keyof IShapeStyle];

      if (value !== undefined && currentComponent.value) {
        currentComponent.value.style[key] = value;
      }
    }
  }

  //  页面布局数据
  const canvasStyleData = ref<ICanvasStyleData>({
    width: 1280,
    height: 900,
    scale: 100,
    color: "#000",
    opacity: 1,
    background: "#fff",
    fontSize: 14
  });

  function setCanvasStyleData(key: string, val: unknown): void;
  function setCanvasStyleData(value: Recordable, _: undefined): void;
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
    currentComponent,
    currentComponentIndex,
    setCurrentComponent,
    setShapeStyle,
    canvasStyleData,
    setCanvasStyleData
  };
});

export default {
  install(app: App) {
    app.use(pinia);
  }
};
