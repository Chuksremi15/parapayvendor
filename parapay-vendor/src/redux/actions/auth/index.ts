import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_LOADING_INDICATOR,
  LoginRequestProp,
  LoginSuccessProp,
  LoginRequestPayload,
  AjaxError,
  Logout,
  LoginSuccessPayload,
  LoadingIndicatorProp,
  GET_DASHBOARD_STARTS_LOADING_INDICATOR,
} from "../../types";

export const loginRequest = (prop: LoginRequestPayload): LoginRequestProp => {
  return {
    type: LOGIN_REQUEST,
    payload: prop,
  };
};

export const loginSuccess = (prop: LoginSuccessPayload): LoginSuccessProp => {
  return {
    type: LOGIN_SUCCESS,
    payload: prop,
  };
};

export const loginFailure = (error: string): AjaxError => {
  return {
    type: LOGIN_FAILURE,
    payload: { error },
  };
};

export const loginLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: LOGIN_LOADING_INDICATOR,
    payload: { loading },
  };
};

export const logout = (): Logout => {
  return {
    type: LOGOUT,
  };
};
