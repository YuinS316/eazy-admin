import { MockMethod } from "vite-plugin-mock";
import { TableItem } from "../../src/api/mock/model/tableModel";
import { resolveSuccess } from "../_utils";

const adminInfo = {
  name: "Admin",
  id: "0",
  email: "xxx@gmail.com",
  role: "admin"
};

const apiList: MockMethod[] = [
  {
    url: "/mock/v1/login",
    method: "post",
    response: () => {
      return resolveSuccess(adminInfo);
    }
  }
];

export default apiList;
