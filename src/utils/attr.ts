export const styleData = [
  { type: "input-number", key: "left", label: "x 坐标" },
  { type: "input-number", key: "top", label: "y 坐标" },
  { type: "input-number", key: "rotate", label: "旋转角度" },
  { type: "input-number", key: "width", label: "宽" },
  { type: "input-number", key: "height", label: "高" },
  { type: "color-picker", key: "color", label: "颜色" },
  { type: "color-picker", key: "backgroundColor", label: "背景色" },
  { type: "input-number", key: "borderWidth", label: "边框宽度" },
  { type: "select", key: "borderStyle", label: "边框风格" },
  { type: "color-picker", key: "borderColor", label: "边框颜色" },
  { type: "input-number", key: "borderRadius", label: "边框半径" },
  { type: "input-number", key: "fontSize", label: "字体大小" },
  { type: "input-number", key: "fontWeight", label: "字体粗细" },
  { type: "input-number", key: "lineHeight", label: "行高" },
  { type: "input-number", key: "letterSpacing", label: "字间距" },
  { type: "select", key: "textAlign", label: "左右对齐" },
  { type: "select", key: "verticalAlign", label: "上下对齐" },
  { type: "input-number", key: "opacity", label: "不透明度" }
];

export const textAlignOptions = [
  {
    label: "左对齐",
    value: "left"
  },
  {
    label: "居中",
    value: "center"
  },
  {
    label: "右对齐",
    value: "right"
  }
];

export const borderStyleOptions = [
  {
    label: "实线",
    value: "solid"
  },
  {
    label: "虚线",
    value: "dashed"
  }
];

export const verticalAlignOptions = [
  {
    label: "上对齐",
    value: "top"
  },
  {
    label: "居中对齐",
    value: "middle"
  },
  {
    label: "下对齐",
    value: "bottom"
  }
];

export const optionMap = {
  textAlign: textAlignOptions,
  borderStyle: borderStyleOptions,
  verticalAlign: verticalAlignOptions
};
