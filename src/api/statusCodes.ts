export interface ListResponse<T> {
  code: number;
  message: string;
  data: T[];
}
export interface ListOneResponse<T> {
  code: number;
  message: string;
  data: T;
}
