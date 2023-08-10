import { setActivePinia, createPinia, storeToRefs } from "pinia";
import { useEditorStore } from "../editor";
import { describe, it, beforeEach, expect } from "vitest";

describe("EditorStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("add component", () => {
    //  ready
    const editorStore = useEditorStore();
    const { addComponentData } = editorStore;
    const { componentData } = storeToRefs(editorStore);

    //  action
    addComponentData({});
    expect(componentData.value.length).toBe(1);

    addComponentData({}, 1);
    expect(componentData.value.length).toBe(2);
  });

  it("delete component", () => {
    const editorStore = useEditorStore();
    const { addComponentData, deleteComponent, setCurrentComponent } =
      editorStore;
    const { componentData } = storeToRefs(editorStore);

    let component = {};
    let index = 0;
    addComponentData(component);
    expect(componentData.value.length).toBe(1);

    //  需要先设置选中的组件
    setCurrentComponent(component, index);
    deleteComponent();
    expect(componentData.value.length).toBe(0);
  });
});
