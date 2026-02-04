import '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError } from './types';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiError>;
  }
}
