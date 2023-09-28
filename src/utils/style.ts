import { Recordable } from "@/types/typing";
import { cos, sin } from "./transition";

export function getShapeStyle(style: Recordable) {
  const result: Recordable = {};

  ["width", "height", "top", "left", "rotate"].forEach(attr => {
    if (attr != "rotate") {
      result[attr] = style[attr] + "px";
    } else {
      result.transform = "rotate(" + style[attr] + "deg)";
    }
  });

  return result;
}

export function getComponentRotateStyle(style: Recordable) {
  style = { ...style };
  if (style.rotate != 0) {
    const newWidth =
      style.width * cos(style.rotate) + style.height * sin(style.rotate);
    const diffX = (style.width - newWidth) / 2;
    style.left += diffX;
    style.right = style.left + newWidth;

    const newHeight =
      style.height * cos(style.rotate) + style.width * sin(style.rotate);
    const diffY = (newHeight - style.height) / 2;
    style.top -= diffY;
    style.bottom = style.top + newHeight;

    style.width = newWidth;
    style.height = newHeight;
  } else {
    style.bottom = style.top + style.height;
    style.right = style.left + style.width;
  }

  return style;
}

const keyWithPx = [
  "fontSize",
  "width",
  "height",
  "top",
  "left",
  "borderWidth",
  "letterSpacing",
  "borderRadius"
];

export function getStyle(style: Recordable, filters: string[] = []) {
  const result: Recordable = {};

  Object.keys(style).forEach(key => {
    if (!filters.includes(key)) {
      if (key === "deg") {
      } else if (key === "scale") {
        result[key] = style[key] + "%";
      } else {
        let value = style[key];

        if (value !== "") {
          result[key] = value;

          if (keyWithPx.includes(key)) {
            result[key] += "px";
          }
        }
      }
    }
  });

  return result;
}
