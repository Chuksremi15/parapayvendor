import {
  AjaxError,
  GET_WALLET_HISTORY_REQUEST,
  GET_WALLET_HISTORY_SUCCESS,
  GET_DASHBOARD_STARTS_REQUEST,
  GET_DASHBOARD_STARTS_SUCCESS,
  GET_DASHBOARD_STARTS_FAILURE,
  GET_WALLET_HISTORY_FAILURE,
  GET_DASHBOARD_STARTS_LOADING_INDICATOR,
  GET_WALLET_HISTORY_LOADING_INDICATOR,
  DashBoardStatsProps,
  GetDashboardStartsRequestPayload,
  GetDashboardStartsRequestProp,
  GetDashboardStartsSuccessPayload,
  GetDashboardStartsSuccessProp,
  GetWalletHistoryRequestPayload,
  GetWalletHistoryRequestProp,
  GetWalletHistorySuccessPayload,
  GetWalletHistorySuccessProp,
  LoadingIndicatorProp,
} from "../../types";

export const getDashboardStartsRequest = (
  prop: GetDashboardStartsRequestPayload
): GetDashboardStartsRequestProp => {
  return {
    type: GET_DASHBOARD_STARTS_REQUEST,
    payload: prop,
  };
};
export const getWalletHistoryRequest = (
  prop: GetWalletHistoryRequestPayload
): GetWalletHistoryRequestProp => {
  return {
    type: GET_WALLET_HISTORY_REQUEST,
    payload: prop,
  };
};

export const getDashboardStartsSuccess = (
  prop: GetDashboardStartsSuccessPayload
): GetDashboardStartsSuccessProp => {
  return {
    type: GET_DASHBOARD_STARTS_SUCCESS,
    payload: prop,
  };
};
export const getWalletHistorySuccess = (
  prop: GetWalletHistorySuccessPayload
): GetWalletHistorySuccessProp => {
  return {
    type: GET_WALLET_HISTORY_SUCCESS,
    payload: prop,
  };
};

export const getDashboardStartsFailure = (error: string): AjaxError => {
  return {
    type: GET_DASHBOARD_STARTS_FAILURE,
    payload: { error },
  };
};
export const getWalletHistoryFailure = (error: string): AjaxError => {
  return {
    type: GET_WALLET_HISTORY_FAILURE,
    payload: { error },
  };
};

export const getDashboardStartsLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: GET_DASHBOARD_STARTS_LOADING_INDICATOR,
    payload: { loading },
  };
};

export const getWalletHistoryLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: GET_WALLET_HISTORY_LOADING_INDICATOR,
    payload: { loading },
  };
};
