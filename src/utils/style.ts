import { Recordable } from "@/types/typing";
import { postiveCos, positiveSin } from "./transition";
import { isString } from "./type";

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
      style.width * postiveCos(style.rotate) +
      style.height * positiveSin(style.rotate);
    const diffX = (style.width - newWidth) / 2;
    style.left += diffX;
    style.right = style.left + newWidth;

    const newHeight =
      style.height * postiveCos(style.rotate) +
      style.width * positiveSin(style.rotate);
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
      if (key === "rotate") {
        result[key] = style[key] + "deg";
      } else if (key === "scale") {
        result[key] = style[key] + "%";
      } else {
        let value = style[key];

        if (value !== "") {
          result[key] = value;

          if (keyWithPx.includes(key) && !isString(value)) {
            result[key] += "px";
          }
        }
      }
    }
  });

  return result;
}
