<template>
  <div class="mark-line">
    <div
      v-show="lineStatus[line]"
      v-for="line in lines"
      :key="line"
      ref="linesRefs"
      class="line"
      :id="line"
      :class="getCls(line)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store/editor";
import { getComponentRotateStyle } from "@/utils/style";
import { storeToRefs } from "pinia";

type LineType = "xt" | "xc" | "xb" | "yl" | "yc" | "yr";

interface ConditionType {
  //  是否符合阈值
  isClosed: boolean;
  //  辅助线对应的真实节点
  node: HTMLDivElement;
  //  辅助线标识
  line: LineType;
  //  辅助线对应的位置
  lineShift: number;
  //  吸附所对应的位置
  shift: number;
}

//  辅助线的标识
const lines = ref<LineType[]>(["xt", "xc", "xb", "yl", "yc", "yr"]);

//  是否吸附的阈值
const threshold = 3;

//  各辅助线是否展示
const lineStatus = ref<{ [k in LineType]: boolean }>({
  xt: false,
  xc: false,
  xb: false,
  yl: false,
  yc: false,
  yr: false
});
const linesRefs = ref<HTMLDivElement[]>([]);

onMounted(() => {
  window.$eventBus.on("stopMove", hideLine);
  window.$eventBus.on("move", showLine);
});

onUnmounted(() => {
  window.$eventBus.off("stopMove", hideLine);
  window.$eventBus.off("move", showLine);
});

function getCls(key: LineType) {
  return key.startsWith("x") ? "x-line" : "y-line";
}

const editorStore = useEditorStore();
const { setShapeStyle } = editorStore;
const { componentData, currentComponent } = storeToRefs(editorStore);

/**
 * 是否靠的足够近进行吸附
 *
 * @param source
 * @param target
 */
function isClosed(source: number, target: number) {
  return Math.abs(source - target) <= threshold;
}

/**
 * 通过id去找真实节点，因为v-for + ref返回的真实节点列表可能不按顺序
 *
 * @param nodeList
 * @param id
 */
function findRealNodeById(nodeList: HTMLDivElement[], id: string) {
  return nodeList.find(item => item.id === id);
}

/**
 * 展示辅助线
 *
 * @param isDownward 是否向下移动
 * @param isRightward  是否向右移动
 */
function showLine(isDownward: boolean, isRightward: boolean) {
  if (currentComponent.value !== null) {
    const {
      top: currTop,
      left: currLeft,
      width: currWidth,
      height: currHeight,
      bottom: currBottom,
      right: currRight
    } = getComponentRotateStyle(currentComponent.value.style);
    const currHalfWidth = currWidth / 2;
    const currHalfHeight = currHeight / 2;

    hideLine();

    componentData.value
      .filter(item => item !== currentComponent.value)
      .forEach(component => {
        const { width, height, left, top, right, bottom } =
          getComponentRotateStyle(component.style);

        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const conditions: { top: ConditionType[]; left: ConditionType[] } = {
          top: [
            //  上边线，靠近其他组件的上边缘
            {
              line: "xt",
              node: findRealNodeById(linesRefs.value, "xt")!,
              isClosed: isClosed(currTop, top),
              lineShift: top,
              shift: top
            },
            //  上边线，靠近其他组件的下边缘
            {
              line: "xt",
              node: findRealNodeById(linesRefs.value, "xt")!,
              isClosed: isClosed(currTop, bottom),
              lineShift: bottom,
              shift: bottom
            },
            //  上边线，靠近其他组件中间的位置
            {
              line: "xt",
              node: findRealNodeById(linesRefs.value, "xt")!,
              isClosed: isClosed(currTop, top + halfHeight),
              lineShift: top + halfHeight,
              shift: top + halfHeight
            },
            //  中间线，靠近上边线
            {
              line: "xc",
              node: findRealNodeById(linesRefs.value, "xc")!,
              isClosed: isClosed(currTop + currHalfHeight, top),
              lineShift: top,
              shift: top - currHalfHeight
            },
            //  中间线，向中间靠
            {
              line: "xc",
              node: findRealNodeById(linesRefs.value, "xc")!,
              isClosed: isClosed(currTop + currHalfHeight, top + halfHeight),
              lineShift: top + halfHeight,
              shift: top + halfHeight - currHalfHeight
            },
            //  中间线，靠近下边缘
            {
              line: "xc",
              node: findRealNodeById(linesRefs.value, "xc")!,
              isClosed: isClosed(currTop + currHalfHeight, bottom),
              lineShift: bottom,
              shift: bottom - currHalfHeight
            },
            //  下边线，靠近其他组件的下边缘
            {
              line: "xb",
              node: findRealNodeById(linesRefs.value, "xb")!,
              isClosed: isClosed(currBottom, bottom),
              lineShift: bottom,
              shift: bottom - currHeight
            },
            //  下边线，靠近其他组件的中间位子
            {
              line: "xb",
              node: findRealNodeById(linesRefs.value, "xb")!,
              isClosed: isClosed(currBottom, top + halfHeight),
              lineShift: top + halfHeight,
              shift: top + halfHeight - currHeight
            },
            //  下边线，靠近其他组件的上边缘
            {
              line: "xb",
              node: findRealNodeById(linesRefs.value, "xb")!,
              isClosed: isClosed(currBottom, top),
              lineShift: top,
              shift: top - currHeight
            }
          ],
          left: [
            //  左边线，靠近其他组件的左边缘
            {
              line: "yl",
              node: findRealNodeById(linesRefs.value, "yl")!,
              isClosed: isClosed(currLeft, left),
              lineShift: left,
              shift: left
            },
            //  左边线，靠近其他组件的右边缘
            {
              line: "yl",
              node: findRealNodeById(linesRefs.value, "yl")!,
              isClosed: isClosed(currLeft, right),
              lineShift: right,
              shift: right
            },
            //  左边线，靠近其他组件中间的位置
            {
              line: "yl",
              node: findRealNodeById(linesRefs.value, "yl")!,
              isClosed: isClosed(currLeft, left + halfWidth),
              lineShift: left + halfWidth,
              shift: left + halfWidth
            },
            //  中间线，向左边缘靠
            {
              line: "yc",
              node: findRealNodeById(linesRefs.value, "yc")!,
              isClosed: isClosed(currLeft + currHalfWidth, left),
              lineShift: left,
              shift: left - currHalfWidth
            },
            //  中间线，向中间靠
            {
              line: "yc",
              node: findRealNodeById(linesRefs.value, "yc")!,
              isClosed: isClosed(currLeft + currHalfWidth, left + halfWidth),
              lineShift: left + halfWidth,
              shift: left + halfWidth - currHalfWidth
            },
            //  中间线，向右边缘靠
            {
              line: "yc",
              node: findRealNodeById(linesRefs.value, "yc")!,
              isClosed: isClosed(currLeft + currHalfWidth, right),
              lineShift: right,
              shift: right - currHalfWidth
            },
            //  右边线，靠近其他组件的右边缘
            {
              line: "yr",
              node: findRealNodeById(linesRefs.value, "yr")!,
              isClosed: isClosed(currRight, right),
              lineShift: right,
              shift: right - currWidth
            },
            //  右边线，靠近其他组件的中间位子
            {
              line: "yr",
              node: findRealNodeById(linesRefs.value, "yr")!,
              isClosed: isClosed(currRight, left + halfWidth),
              lineShift: left + halfWidth,
              shift: left + halfWidth - currWidth
            },
            //  右边线，靠近其他组件的左边缘
            {
              line: "yr",
              node: findRealNodeById(linesRefs.value, "yr")!,
              isClosed: isClosed(currRight, left),
              lineShift: left,
              shift: left - currWidth
            }
          ]
        };

        Object.keys(conditions).forEach(key => {
          conditions[key as keyof typeof conditions]
            .filter(condition => condition.isClosed === true)
            .forEach(condition => {
              condition.node.style[key as any] = `${condition.lineShift}px`;
              lineStatus.value[condition.line] = true;
              // debugger;
              setShapeStyle({
                [key]: condition.shift
              });
            });
        });
      });
  }
}

/**
 * 隐藏辅助线
 */
function hideLine() {
  Object.keys(lineStatus.value).forEach(key => {
    lineStatus.value[key as LineType] = false;
  });
}
</script>

<style lang="scss" scoped>
.mark-line {
  width: 100%;
  .line {
    background: var(--primary-color);
    position: absolute;
    z-index: 1000;
  }

  .x-line {
    width: 100%;
    height: 1px;
  }

  .y-line {
    width: 1px;
    height: 100%;
  }
}
</style>
