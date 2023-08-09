export function swap(arr: any[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export function cloneDeep<T = unknown>(target: T): T {
  if (typeof target === "object") {
    const result = (Array.isArray(target) ? [] : {}) as T;
    for (const k in target) {
      const key = k as keyof typeof target;
      if (typeof target[key] === "object") {
        result[key] = cloneDeep(target[key]);
      } else {
        result[key] = target[key];
      }
    }

    return result;
  }

  return target;
}
