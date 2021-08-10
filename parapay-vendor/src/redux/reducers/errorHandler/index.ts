import {
  DISPATCH_ERROR,
  CLEAR_ERROR_STATE,
  DispatchErrorPayload,
  ErrorHandlerActions,
} from "../../types";

export type ErrorHandlerStore = {
  error?: DispatchErrorPayload;
};
const initialState = (): ErrorHandlerStore => ({});
export const errorHandlerReducer = (
  prevState: ErrorHandlerStore = initialState(),
  { type, payload }: ErrorHandlerActions
): ErrorHandlerStore => {
  switch (type) {
    case DISPATCH_ERROR:
      prevState.error = payload;
      return { ...prevState };
    case CLEAR_ERROR_STATE:
      return initialState();
    default:
      return prevState;
  }
};
