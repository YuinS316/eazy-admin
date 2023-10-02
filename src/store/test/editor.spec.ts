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

  describe("move layer", () => {
    it("move up", () => {
      //  prepare
      const editorStore = useEditorStore();
      const { addComponentData, moveUpComponent, setCurrentComponent } =
        editorStore;
      const { componentData } = storeToRefs(editorStore);

      let component = {
        id: "c1"
      };

      //  action
      addComponentData(component);
      addComponentData({});
      setCurrentComponent(component, 0);
      moveUpComponent();

      //  result
      expect(componentData.value[1]).toStrictEqual(component);
    });
    it("move down", () => {
      //  prepare
      const editorStore = useEditorStore();
      const { addComponentData, moveDownComponent, setCurrentComponent } =
        editorStore;
      const { componentData } = storeToRefs(editorStore);

      let component = {
        id: "c1"
      };

      //  action
      addComponentData({});
      addComponentData(component);
      setCurrentComponent(component, 1);
      moveDownComponent();

      //  result
      expect(componentData.value[0]).toStrictEqual(component);
    });
    it("move top", () => {
      //  prepare
      const editorStore = useEditorStore();
      const { addComponentData, moveTopComponent, setCurrentComponent } =
        editorStore;
      const { componentData } = storeToRefs(editorStore);

      let component = {
        id: "c1"
      };

      //  action
      addComponentData(component);
      addComponentData({});
      addComponentData({});
      addComponentData({});
      setCurrentComponent(component, 0);
      moveTopComponent();

      //  result
      expect(componentData.value[componentData.value.length - 1]).toStrictEqual(
        component
      );
    });
    it("move bottom", () => {
      //  prepare
      const editorStore = useEditorStore();
      const { addComponentData, moveBottomComponent, setCurrentComponent } =
        editorStore;
      const { componentData } = storeToRefs(editorStore);

      let component = {
        id: "c1"
      };

      //  action
      addComponentData({});
      addComponentData({});
      addComponentData({});
      addComponentData(component);
      setCurrentComponent(component, componentData.value.length - 1);
      moveBottomComponent();

      //  result
      expect(componentData.value[0]).toStrictEqual(component);
    });
  });
});
