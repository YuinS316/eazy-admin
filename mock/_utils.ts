export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  UNAUTHORIZED = 401
}

type Recordable = Record<string, any>;

export function resolveSuccess<T = Recordable>(
  data: T,
  { message = "ok" } = {}
) {
  return {
    code: ResultEnum.SUCCESS,
    data,
    message,
    type: "success"
  };
}
