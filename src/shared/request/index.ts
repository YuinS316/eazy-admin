import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";

//  拦截器接口
interface BaseRequestInterceptors<T = AxiosResponse> {
  //  请求成功
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  //  请求失败
  requestInterceptorCatch?: (error: any) => any;
  //  响应成功
  responseInterceptor?: (response: T) => T;
  //  响应失败
  responseInterceptorCatch?: (error: any) => any;
}

//  自定义配置
interface BaseRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: BaseRequestInterceptors<T>;
}

class BaseRequest {
  instance: AxiosInstance;
  interceptors?: BaseRequestInterceptors;

  constructor(config: BaseRequestConfig) {
    this.instance = axios.create(config);

    this.interceptors = config.interceptors;

    //  全局拦截
    this.globalInterceptor();

    //  实例级别的拦截器
    this.instanceInterceptor();
  }

  globalInterceptor() {
    //  全局请求拦截
    this.globalRequestInterceptor();
    //  全局响应拦截
    this.globalResponseInterceptor();
  }

  //  全局请求拦截
  globalRequestInterceptor() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        console.log("全局请求拦截失败", error);
        return Promise.reject(error);
      }
    );
  }

  //  全局响应拦截
  globalResponseInterceptor() {
    this.instance.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        console.log("全局响应拦截失败", error);
        return Promise.reject(error);
      }
    );
  }

  //  实例级别拦截器
  instanceInterceptor() {
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }

  request<T>(config: BaseRequestConfig<T>): Promise<T> {
    //  接口调用级别的拦截
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config);
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  get<T>(
    url: string,
    params?: Record<string, any>,
    config?: BaseRequestConfig<T>
  ): Promise<T> {
    return this.request({
      url,
      method: "get",
      params,
      ...config
    });
  }

  post<T>(
    url: string,
    data?: Record<string, any>,
    config?: BaseRequestConfig<T>
  ): Promise<T> {
    return this.request({
      url,
      data,
      method: "post",
      ...config
    });
  }
}

export default BaseRequest;
