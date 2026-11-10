import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import type { ApiError } from '../../types/api';
import { env } from '../../utils/env';
import { getStorageItem } from '../../utils/storage';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeoutMs,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getStorageItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; code?: string }>) => {
    const apiError: ApiError = {
      message:
        error.response?.data?.message ?? error.message ?? 'Something went wrong. Please try again.',
      code: error.response?.data?.code,
      status: error.response?.status,
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  },
);
