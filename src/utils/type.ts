export const isString = (target: any): target is string =>
  typeof target === "string";

export const isObject = <T = object>(target: any): target is T =>
  Object.prototype.toString.call(target) === "[object Object]";