import { localCache } from './cache';
import Request from './http';

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
