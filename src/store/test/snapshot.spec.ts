import { setActivePinia, createPinia, storeToRefs } from "pinia";
import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";
import { useEditorStore } from "../editor";
import { useSnapshotStore } from "../snapshot";

describe("Snapshot Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should record every actions", () => {
    const snapshotStore = useSnapshotStore();
    const { snapshotData } = storeToRefs(snapshotStore);
    const { record } = snapshotStore;

    const editorStore = useEditorStore();
    const { componentData } = storeToRefs(editorStore);

    const timestamp = new Date("2023/01/01").getTime();
    vi.setSystemTime(timestamp);

    componentData.value.push({});
    record("add");

    componentData.value = [];
    record("delete");

    expect(snapshotData.value[0]).toEqual({
      type: "add",
      timestamp,
      value: [{}]
    });

    expect(snapshotData.value[1]).toEqual({
      type: "delete",
      timestamp,
      value: []
    });
  });

  it("should undo can get back to last state", () => {
    const snapshotStore = useSnapshotStore();
    const { record, undo } = snapshotStore;

    const editorStore = useEditorStore();
    const { componentData } = storeToRefs(editorStore);

    componentData.value.push({});
    record("add");

    componentData.value = [];
    record("delete");

    undo();

    expect(componentData.value).toEqual([{}]);
  });

  it("should undo not work when snapshotData is empty", () => {
    const snapshotStore = useSnapshotStore();
    const { undo } = snapshotStore;

    const editorStore = useEditorStore();
    const { componentData } = storeToRefs(editorStore);

    undo();

    expect(componentData.value).toEqual([]);
  });

  it("should redo can go forward to next state", () => {
    const snapshotStore = useSnapshotStore();
    const { record, undo, redo } = snapshotStore;

    const editorStore = useEditorStore();
    const { componentData } = storeToRefs(editorStore);

    componentData.value.push({});
    record("add");

    componentData.value = [];
    record("delete");

    undo();

    redo();

    expect(componentData.value).toEqual([]);
  });

  it("should redo not work when snapshotIndex is at the end", () => {
    const snapshotStore = useSnapshotStore();
    const { isRedoEnable } = storeToRefs(snapshotStore);
    const { redo } = snapshotStore;

    const editorStore = useEditorStore();
    const { componentData } = storeToRefs(editorStore);

    isRedoEnable.value && redo();
    expect(componentData.value).toEqual([]);
  });

  it("should cover state when undo and record a new action", () => {
    const snapshotStore = useSnapshotStore();
    const { record, undo } = snapshotStore;

    const editorStore = useEditorStore();
    const { componentData } = storeToRefs(editorStore);

    componentData.value.push({});
    record("add");

    componentData.value.push({});
    record("add");

    undo();

    componentData.value.push({ id: 1 });
    expect(componentData.value).toEqual([{}, { id: 1 }]);
  });
});
