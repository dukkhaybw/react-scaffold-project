/**
 * 基于网络请求基础库二次封装得来的
 * 直接用于业务的网络请求模块
 */
import Request from './http';
import { localCache } from './cache';

const hyRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => err,
    responseInterceptor: (res) => res,
    responseInterceptorCatch: (err) => err
  }
});

export default hyRequest;
