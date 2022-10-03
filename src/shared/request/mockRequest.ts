import BaseRequest from "./index";

const mockRequest = new BaseRequest({
  baseURL: "/mock/v1",
  timeout: 10000,
  interceptors: {}
});

export default mockRequest;
