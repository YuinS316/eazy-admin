import mockRequest from "@/shared/request/mockRequest";
import { UserInfo, LoginBody } from "./model/userModel";
import { BaseModel } from "./../model/baseModel";

export function postLogin(data: LoginBody) {
  return mockRequest.post<BaseModel<UserInfo>, LoginBody>("login", data);
}
