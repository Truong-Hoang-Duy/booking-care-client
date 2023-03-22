import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";
import { BASE_URL } from "../shared/configs/config";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  return config;
});

instance.interceptors.response.use((response: AxiosResponse) => {
  if (response && response.data) {
    return response.data;
  }
  return response.data;
});

export default instance;
