import { Recordable } from "@/types/typing";

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
