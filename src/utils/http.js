import axios from 'axios';

class Request {
  constructor(baseConfig) {
    this.instance = axios.create(baseConfig);
    // 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => config,
      (err) => err
    );

    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => err
    );

    // 实例的拦截器
    this.instance.interceptors.request.use(
      baseConfig.interceptors?.requestInterceptor,
      baseConfig.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      baseConfig.interceptors?.responseInterceptor,
      baseConfig.interceptors?.responseInterceptorCatch
    );
  }

  request(config) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config);
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err);
          }
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: 'GET' });
  }

  post(config) {
    return this.request({ ...config, method: 'POST' });
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' });
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default Request;
