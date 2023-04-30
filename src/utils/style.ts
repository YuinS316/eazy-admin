import { Recordable } from "@/types/typing";

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
