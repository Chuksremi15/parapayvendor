import {
  DISPATCH_ERROR,
  DispatchErrorPayload,
  DispatchErrorProp,
} from "../../types";

export const dispatchError = (
  prop: DispatchErrorPayload
): DispatchErrorProp => {
  return {
    type: DISPATCH_ERROR,
    payload: prop,
  };
};
