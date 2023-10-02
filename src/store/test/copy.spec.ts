import { setActivePinia, createPinia, storeToRefs } from "pinia";
import { it, expect, describe, beforeEach } from "vitest";
import { useCopyStore } from "../copy";
import { useEditorStore } from "../editor";

describe("CopyStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("copy component", () => {
    const copyStore = useCopyStore();

    const editorStore = useEditorStore();
    const { addComponentData, setCurrentComponent } = editorStore;

    const { copyComponent, _copiedComponent } = copyStore;

    let component = {
      id: "c1"
    };

    //  action
    addComponentData(component);
    setCurrentComponent(component, 0);
    copyComponent();

    //  result
    expect(_copiedComponent).toEqual({
      data: component,
      index: 0
    });
  });

  it("paste component", () => {
    const copyStore = useCopyStore();
    const { copyComponent, pasteComponent } = copyStore;

    const editorStore = useEditorStore();
    const { componentData } = storeToRefs(editorStore);
    const { addComponentData, setCurrentComponent } = editorStore;

    let component = {
      id: "c1",
      style: {}
    };

    //  action
    addComponentData(component);
    setCurrentComponent(component, 0);
    copyComponent();
    pasteComponent();

    //  result
    expect(componentData.value.length).toBe(2);
    //  check deep clone
    expect(componentData.value[1]).not.toBe(component);
    //  will generate unique id
    expect(componentData.value[1].id).not.toBeUndefined();
  });

  it("cut component", () => {
    const copyStore = useCopyStore();
    const { cutComponent, pasteComponent, _copiedComponent } = copyStore;

    const editorStore = useEditorStore();
    const { componentData } = storeToRefs(editorStore);
    const { addComponentData, setCurrentComponent } = editorStore;

    let component = {
      id: "c1",
      style: {}
    };

    //  action
    addComponentData(component);
    setCurrentComponent(component, 0);
    cutComponent();

    expect(_copiedComponent).toEqual({
      data: component,
      index: 0
    });
    expect(componentData.value.length).toBe(0);
  });
});
