export interface AjaxError {
  type: string;
  payload: {
    error: string;
  };
}

export interface Type {
  type: string;
}

export interface ErrorState {
  [key: string]: string;
}

export interface GenericPayload<T> {
  payload: T;
}

export interface SuccessResponse {
  status?: "success";
  message: string;
}

export interface LoadingIndicatorProp extends Type {
  payload: { loading: boolean };
}

export interface Token {
  token?: string;
}

export type ObjectId = string;
