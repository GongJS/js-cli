import axios, { AxiosRequestConfig } from 'axios';
import { SERVER } from './variable'

interface IResponse<T> {
    code: number;
    data: T;
    message: string;
}
const service = axios.create({
    baseURL: SERVER.apiUrl,
    timeout: 10000,
});
const request = <T>(options: AxiosRequestConfig) => {
    return service.request<IResponse<T>>(options).then((response) => {
        if (response.data.code === 0) {
            return response.data.data;
        } else {
            return Promise.reject(new Error(response.data.message));
        }
    });
};
service.interceptors.request.use(
  (config) => {
      return config;
  },
  (error) => {
      return Promise.reject(error);
  },
);

service.interceptors.response.use<{ data: { code: number } }>(
  (response) => {
      return response;
  },
  (error) => {
      return Promise.reject(error);
  },
);

export default request;

