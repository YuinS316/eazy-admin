import { MockMethod } from "vite-plugin-mock";
import { TableItem } from "../../src/api/mock/model/tableModel";
import { resolveSuccess } from "../_utils";

const apiList: MockMethod[] = [
  {
    url: "/mock/v1/demo",
    method: "get",
    response: () => {
      return resolveSuccess<TableItem[]>([
        {
          name: "哆啦a梦",
          sex: "?",
          address: "日本"
        },
        {
          name: "大熊",
          sex: "男",
          address: "日本"
        },
        {
          name: "静香",
          sex: "女",
          address: "日本"
        }
      ]);
    }
  }
];

export default apiList;
