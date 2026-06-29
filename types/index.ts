export * from './product';
export * from './order';
export * from './admin';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface FilterState {
  [key: string]: string | string[] | number | boolean | undefined;
}
