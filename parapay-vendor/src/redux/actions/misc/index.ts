import {
  AjaxError,
  GetBanksRequestPayload,
  GET_BANKS_REQUEST,
  GetBanksSuccessProp,
  GetBanksSuccessPayload,
  GET_BANKS_SUCCESS,
  GET_BANKS_FAILURE,
  GetBanksRequestProp,
  LoadingIndicatorProp,
  GET_BANKS_LOADING_INDICATOR,
} from "../../types";

export const getBanksRequest = (
  prop: GetBanksRequestPayload
): GetBanksRequestProp => {
  return {
    type: GET_BANKS_REQUEST,
    payload: prop,
  };
};
export const getBanksSuccess = (
  prop: GetBanksSuccessPayload
): GetBanksSuccessProp => {
  return {
    type: GET_BANKS_SUCCESS,
    payload: prop,
  };
};

export const getBanksFailure = (error: string): AjaxError => {
  return {
    type: GET_BANKS_FAILURE,
    payload: { error },
  };
};

export const getBanksLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: GET_BANKS_LOADING_INDICATOR,
    payload: { loading },
  };
};
