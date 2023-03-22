export interface ListResponse<T> {
  code: number;
  message: string;
  data?: T[];
}

export interface StateType<T> {
  code?: number;
  data?: T[];
  isLoading: boolean;
  message: string;
}

export enum ApiActionKind {
  REQUEST = "fetchAPI/request",
  SUCCESS = "fetchAPI/success",
  ERROR = "fetchAPI/error",
}

export interface ActionType<T> {
  type: ApiActionKind;
  payload: StateType<T>;
}
