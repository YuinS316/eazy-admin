import { commonStyle } from "@/material-components/component-list";
import { AreaData, ComponentData, Point } from "@/types/typing";
import { cloneDeep } from "@/utils";
import { generateId } from "@/utils/id";
import { getStyle } from "@/utils/style";
import { mod360 } from "@/utils/transition";
import { defineStore, storeToRefs } from "pinia";
import { useEditorStore } from "./editor";

export const useComposeStore = defineStore("compose", () => {
  const editorStore = useEditorStore();
  const { componentData, currentComponent } = storeToRefs(editorStore);
  const { addComponentData, setCurrentComponent, deleteComponent } =
    editorStore;

  //  ========== 获取编辑器的dom =============
  const editorRef = ref<HTMLDivElement>();

  function setEditorRef(value: HTMLDivElement) {
    editorRef.value = value;
  }

  //  ========== 组合的数据 ==================
  const areaData = ref<AreaData | null>(null);

  function setAreaData(data: AreaData) {
    areaData.value = data;
  }

  function compose() {
    if (areaData.value) {
      const components = cloneDeep(areaData.value.components);

      const groupComponent: ComponentData = {
        id: generateId(),
        component: "EzGroup",
        style: {
          ...commonStyle,
          ...areaData.value.style
        },
        propValue: components
      };

      const toPrecent = (value: number) => {
        return (value * 100).toPrecision(2) + "%";
      };

      //  计算组合后内部组件的样式
      const calculateGroupInsideStyle = () => {
        const parentStyle = groupComponent.style;
        (groupComponent.propValue as ComponentData[]).forEach(component => {
          const style = component.style;
          component.groupStyle = {
            ...getStyle(style),
            left: toPrecent(
              (style.left - parentStyle.left) / parentStyle.width
            ),
            top: toPrecent((style.top - parentStyle.top) / parentStyle.height),
            width: toPrecent(style.width / parentStyle.width),
            height: toPrecent(style.height / parentStyle.height)
          };
        });
      };

      //  计算组合后的内置组件相对外部边框的百分比距离
      calculateGroupInsideStyle();

      window.$eventBus.emit("hideArea");

      addComponentData(groupComponent);

      //  将组合后的组件移除
      const batchRemoveInsideComponents = () => {
        (groupComponent.propValue as ComponentData[]).forEach(component => {
          let index = componentData.value.findIndex(c => c.id === component.id);
          componentData.value.splice(index, 1);
        });
      };
      batchRemoveInsideComponents();

      //  设置组合组件为选中组件
      setCurrentComponent(groupComponent, componentData.value.length - 1);

      areaData.value = null;
    }
  }

  //  ========= 拆分 ===========
  function decompose() {
    if (currentComponent.value) {
      const components: ComponentData[] = currentComponent.value.propValue;
      const parentStyle = { ...currentComponent.value.style };
      const editorRect = editorRef.value!.getBoundingClientRect();

      const parsePercentToNumber = (value: string): number =>
        +value.replace("%", "") / 100;

      const calDecomposeInsideComponentStyle = (component: ComponentData) => {
        const componentRect = document
          .querySelector(`#component_${component.id}`)!
          .getBoundingClientRect();
        const centerPoint: Point = {
          x: componentRect.left - editorRect.left + componentRect.width / 2,
          y: componentRect.top - editorRect.top + componentRect.height / 2
        };

        component.style.rotate = mod360(
          parentStyle.rotate + component.style.rotate
        );
        component.style.width =
          parsePercentToNumber(component.groupStyle!.width) * parentStyle.width;
        component.style.height =
          parsePercentToNumber(component.groupStyle!.height) *
          parentStyle.height;

        component.style.left = centerPoint.x - component.style.width / 2;
        component.style.top = centerPoint.y - component.style.height / 2;

        component.groupStyle = {};
      };

      //  先删除目前组合的元素
      deleteComponent();

      //  重新计算
      components.forEach(component => {
        calDecomposeInsideComponentStyle(component);

        addComponentData(component);
      });
    }
  }

  return {
    editorRef,
    setEditorRef,
    setAreaData,
    compose,
    decompose
  };
});
