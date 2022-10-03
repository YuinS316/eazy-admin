export interface BaseModel<T> {
  code: number;
  data: T;
  message: string;
  type: string;
}
