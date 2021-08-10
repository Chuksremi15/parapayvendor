import {
  AjaxError,
  GET_WALLET_DETAILS_REQUEST,
  SAVE_WALLET_DETAILS_REQUEST,
  SAVE_WALLET_DETAILS_SUCCESS,
  GET_WALLET_DETAILS_SUCCESS,
  GET_WALLET_DETAILS_FAILURE,
  SAVE_WALLET_DETAILS_FAILURE,
  SET_WALLET_PIN_REQUEST,
  WITHDRAWAL_REQUEST,
  CHANGE_EVICTION_STATUS_REQUEST,
  SET_WALLET_PIN_SUCCESS,
  WITHDRAWAL_SUCCESS,
  CHANGE_EVICTION_STATUS_SUCCESS,
  SET_WALLET_PIN_FAILURE,
  WITHDRAWAL_FAILURE,
  CHANGE_EVICTION_STATUS_FAILURE,
  GetWalletDetailsRequestPayload,
  GetWalletDetailsSuccessPayload,
  GetWalletDetailsSuccessProps,
  SaveWalletDetailsRequestPayload,
  SaveWalletDetailsSuccessPayload,
  SaveWalletDetailsSuccessProps,
  GetWalletDetailsRequestProps,
  SetWalletPinRequestPayload,
  SetWalletPinRequestProp,
  SetWalletPinSuccessProps,
  WithdrawalRequestPayload,
  WithdrawalRequestProp,
  WithdrawalSuccessProps,
  ChangeEvictionStateRequestPayload,
  ChangeEvictionStateRequestProp,
  ChangeEvictionStateSuccessPayload,
  ChangeEvictionStateSuccessProps,
  SaveWalletDetailsRequestProps,
  GetCurrentEvictionRequestPayload,
  GetCurrentEvictionRequestProp,
  GetCurrentEvictionSuccessPayload,
  GET_CURRENT_EVICTION_FAILURE,
  GET_CURRENT_EVICTION_REQUEST,
  GET_CURRENT_EVICTION_SUCCESS,
  GetCurrentEvictionSuccessProp,
  SetWalletPinSuccesspayload,
  WithdrawalSuccessPayload,
  SAVE_WALLET_DETAILS_LOADING_INDICATOR,
  LoadingIndicatorProp,
  GET_WALLET_DETAILS_LOADING_INDICATOR,
  SET_WALLET_PIN_LOADING_INDICATOR,
  WITHDRAWAL_LOADING_INDICATOR,
} from "../../types";

export const getWalletDetailsRequest = (
  prop: GetWalletDetailsRequestPayload
): GetWalletDetailsRequestProps => {
  return {
    type: GET_WALLET_DETAILS_REQUEST,
    payload: prop,
  };
};

export const getWalletDetailsSuccess = (
  prop: GetWalletDetailsSuccessPayload
): GetWalletDetailsSuccessProps => {
  return {
    type: GET_WALLET_DETAILS_SUCCESS,
    payload: prop,
  };
};

export const getWalletDetailsFailure = (error: string): AjaxError => {
  return {
    type: GET_WALLET_DETAILS_FAILURE,
    payload: { error },
  };
};

export const getWalletDetailsLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: GET_WALLET_DETAILS_LOADING_INDICATOR,
    payload: { loading },
  };
};

export const saveWalletDetailsRequest = (
  prop: SaveWalletDetailsRequestPayload
): SaveWalletDetailsRequestProps => {
  return {
    type: SAVE_WALLET_DETAILS_REQUEST,
    payload: prop,
  };
};

export const saveWalletDetailsSuccess = (
  prop: SaveWalletDetailsSuccessPayload
): SaveWalletDetailsSuccessProps => {
  return {
    type: SAVE_WALLET_DETAILS_SUCCESS,
    payload: prop,
  };
};

export const saveWalletDetailsFailure = (error: string): AjaxError => {
  return {
    type: SAVE_WALLET_DETAILS_FAILURE,
    payload: { error },
  };
};

export const saveWalletDetailsLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: SAVE_WALLET_DETAILS_LOADING_INDICATOR,
    payload: { loading },
  };
};

export const setWalletPinRequest = (
  prop: SetWalletPinRequestPayload
): SetWalletPinRequestProp => {
  return {
    type: SET_WALLET_PIN_REQUEST,
    payload: prop,
  };
};

export const setWalletPinSuccess = (
  prop: SetWalletPinSuccesspayload
): SetWalletPinSuccessProps => {
  return {
    type: SET_WALLET_PIN_SUCCESS,
    payload: prop,
  };
};

export const setWalletPinFailure = (error: string): AjaxError => {
  return {
    type: SET_WALLET_PIN_FAILURE,
    payload: { error },
  };
};

export const setWalletPinLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: SET_WALLET_PIN_LOADING_INDICATOR,
    payload: { loading },
  };
};

export const withdrawalRequest = (
  prop: WithdrawalRequestPayload
): WithdrawalRequestProp => {
  return {
    type: WITHDRAWAL_REQUEST,
    payload: prop,
  };
};

export const withdrawalSuccess = (
  prop: WithdrawalSuccessPayload
): WithdrawalSuccessProps => {
  return {
    type: WITHDRAWAL_SUCCESS,
    payload: prop,
  };
};

export const withdrawalFailure = (error: string): AjaxError => {
  return {
    type: WITHDRAWAL_FAILURE,
    payload: { error },
  };
};

export const withdrawalLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: WITHDRAWAL_LOADING_INDICATOR,
    payload: { loading },
  };
};
