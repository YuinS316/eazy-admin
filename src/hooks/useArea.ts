import { useComposeStore } from "@/store/compose";
import { useEditorStore } from "@/store/editor";
import { Point, Recordable } from "@/types/typing";
import { getComponentRotateStyle } from "@/utils/style";
import { storeToRefs } from "pinia";

export function useArea() {
  const isShow = ref(false);

  //  鼠标点击的起始位置
  const startPos = ref<Point>({
    x: 0,
    y: 0
  });

  const width = ref(0);
  const height = ref(0);

  const editorStore = useEditorStore();
  const { currentComponent, componentData } = storeToRefs(editorStore);

  const composeStore = useComposeStore();
  const { editorRef } = storeToRefs(composeStore);

  /**
   * 点击之后开始画选中区域
   */
  function handleMouseDown(e: MouseEvent) {
    hideArea();

    if (editorRef.value) {
      const { x: editorX, y: editorY } =
        editorRef.value.getBoundingClientRect();

      const startX = e.clientX;
      const startY = e.clientY;

      startPos.value = {
        x: startX - editorX,
        y: startY - editorY
      };
      isShow.value = true;

      const move = (ev: MouseEvent) => {
        width.value = Math.abs(ev.clientX - startX);
        height.value = Math.abs(ev.clientY - startY);

        let pos = {
          ...startPos.value
        };

        //  往左方向移动
        if (ev.clientX < startX) {
          pos.x = ev.clientX - editorX;
        }

        //  往上方移动
        if (ev.clientY < startY) {
          pos.y = ev.clientY - editorY;
        }

        startPos.value = pos;
      };

      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);

        hideArea();
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }
  }

  /**
   * 隐藏选中区域
   */
  function hideArea() {
    isShow.value = false;
    startPos.value = {
      x: 0,
      y: 0
    };
    width.value = 0;
    height.value = 0;
  }

  /**
   * 返回画中区域的组件列表
   * @returns
   */
  function getSelectedAreaComponents() {
    const result: Recordable[] = [];
    const { x, y } = startPos.value;

    componentData.value.forEach(component => {
      const {
        left,
        top,
        width: w,
        height: h
      } = getComponentRotateStyle(component.style);

      if (
        left >= x &&
        left + w <= x + width.value &&
        top >= y &&
        top + h <= y + height.value
      ) {
        result.push(component);
      }
    });

    return result;
  }

  /**
   * 将选中的组件做成新的组件
   */
  function createGroup() {
    const areaDataList = getSelectedAreaComponents();
    if (!areaDataList.length) return;

    //  组合后的坐标
    let left = Infinity,
      right = -Infinity,
      top = Infinity,
      bottom = Infinity;

    areaDataList.forEach(component => {
      const {
        left: l,
        right: r,
        top: t,
        bottom: b
      } = getComponentRotateStyle(component.style);

      left = Math.min(left, l);
      top = Math.min(top, t);
      right = Math.max(right, r);
      bottom = Math.max(bottom, b);
    });

    const style = {
      left,
      top,
      width: right - left,
      height: bottom - top
    };
  }

  return {
    isShow,
    startPos,
    width,
    height,
    handleMouseDown
  };
}
