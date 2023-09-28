import axios, { AxiosInstance } from "axios";

class RequestInstance {
  public instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });
  }

  get(url: string, params: any) {
    return this.instance.get(url, {
      params
    });
  }

  post(url: string, body: any) {
    return this.instance.post(url, body);
  }
}

export const request = new RequestInstance("localhost:3000/api");
