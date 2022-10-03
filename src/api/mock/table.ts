import mockRequest from "@/shared/request/mockRequest";
import { TableItem } from "./model/tableModel";
import { BaseModel } from "./../model/baseModel";

export function getTable() {
  return mockRequest.get<BaseModel<TableItem[]>>("demo");
}
