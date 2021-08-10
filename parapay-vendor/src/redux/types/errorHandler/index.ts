import { Type } from "../global";

export interface DispatchErrorPayload {
  status: number;
  statusText: string;
}
export interface DispatchErrorProp extends Type {
  payload: DispatchErrorPayload;
}

export type ErrorHandlerActions = DispatchErrorProp;
