import { Recordable } from "@/types/typing";
import { createPinia, defineStore } from "pinia";
import type { App } from "vue";

const pinia = createPinia();

interface ShapeStyle {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  rotate?: number;
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

  function setShapeStyle(shapeStyle: ShapeStyle) {
    for (const key in shapeStyle) {
      let value = shapeStyle[key as keyof ShapeStyle];

      if (value !== undefined && currentComponent.value) {
        currentComponent.value.style[key] = value;
      }
    }
  }

  return {
    componentData,
    addComponentData,
    currentComponent,
    currentComponentIndex,
    setCurrentComponent,
    setShapeStyle
  };
});

export default {
  install(app: App) {
    app.use(pinia);
  }
};
