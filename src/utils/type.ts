export const isString = (target: any): target is string =>
  typeof target === "string";

export const isNumber = (target: any): target is number =>
  typeof target === "number";

export const isObject = <T = object>(target: any): target is T =>
  Object.prototype.toString.call(target) === "[object Object]";

export const isArray = Array.isArray;
