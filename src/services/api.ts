import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { getToken } from './token';
import {processErrorHandle} from './process-error-handle';
import { StatusCodes } from 'http-status-codes';
import { AppRoute } from '../const';

type DetailMessageType = {
  type: string;
  message: string;
}

const shouldDisplayError = (response: AxiosResponse) =>
  response.status === Number(StatusCodes.BAD_REQUEST)
  || response.status === Number(StatusCodes.NOT_FOUND)
  || window.location.pathname === String(AppRoute.Login) && response.status === Number(StatusCodes.UNAUTHORIZED);

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        processErrorHandle(detailMessage.message);
      }
      throw error;
    }
  );

  return api;
};
