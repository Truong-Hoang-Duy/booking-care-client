export interface ListResponse<T> {
  code: number;
  message: string;
  data?: T[];
}
