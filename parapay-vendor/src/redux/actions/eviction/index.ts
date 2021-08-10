import {
  AjaxError,
  GET_EVICTIONS_REQUEST,
  GET_EVICTION_REQUEST,
  GET_EVICTION_SUCCESS,
  GET_EVICTIONS_SUCCESS,
  GET_EVICTIONS_FAILURE,
  GET_EVICTION_FAILURE,
  ADD_EVICTION_REQUEST,
  UPDATE_EVICTION_REQUEST,
  CHANGE_EVICTION_STATUS_REQUEST,
  ADD_EVICTION_SUCCESS,
  UPDATE_EVICTION_SUCCESS,
  CHANGE_EVICTION_STATUS_SUCCESS,
  ADD_EVICTION_FAILURE,
  UPDATE_EVICTION_FAILURE,
  CHANGE_EVICTION_STATUS_FAILURE,
  GetEvictionsRequestPayload,
  GetEvictionsSuccessPayload,
  GetEvictionsSuccessProps,
  GetEvictionRequestPayload,
  GetEvictionSuccessPayload,
  GetEvictionSuccessProps,
  GetEvictionsRequestProps,
  AddEvictionRequestPayload,
  AddEvictionRequestProp,
  AddEvictionSuccessProps,
  UpdateEvictionRequestPayload,
  UpdateEvictionRequestProp,
  UpdateEvictionSuccessProps,
  ChangeEvictionStateRequestPayload,
  ChangeEvictionStateRequestProp,
  ChangeEvictionStateSuccessPayload,
  ChangeEvictionStateSuccessProps,
  GetEvictionRequestProps,
  GetCurrentEvictionRequestPayload,
  GetCurrentEvictionRequestProp,
  GetCurrentEvictionSuccessPayload,
  GET_CURRENT_EVICTION_FAILURE,
  GET_CURRENT_EVICTION_REQUEST,
  GET_CURRENT_EVICTION_SUCCESS,
  GetCurrentEvictionSuccessProp,
  UPDATE_EVICTION_LOADING_INDICATOR,
  LoadingIndicatorProp,
  ADD_EVICTION_LOADING_INDICATOR,
} from "../../types";

export const getEvictionsRequest = (
  prop: GetEvictionsRequestPayload
): GetEvictionsRequestProps => {
  return {
    type: GET_EVICTIONS_REQUEST,
    payload: prop,
  };
};

export const getEvictionsSuccess = (
  prop: GetEvictionsSuccessPayload
): GetEvictionsSuccessProps => {
  return {
    type: GET_EVICTIONS_SUCCESS,
    payload: prop,
  };
};

export const getEvictionsFailure = (error: string): AjaxError => {
  return {
    type: GET_EVICTIONS_FAILURE,
    payload: { error },
  };
};

export const getEvictionRequest = (
  prop: GetEvictionRequestPayload
): GetEvictionRequestProps => {
  return {
    type: GET_EVICTION_REQUEST,
    payload: prop,
  };
};

export const getEvictionSuccess = (
  prop: GetEvictionSuccessPayload
): GetEvictionSuccessProps => {
  return {
    type: GET_EVICTION_SUCCESS,
    payload: prop,
  };
};

export const getEvictionFailure = (error: string): AjaxError => {
  return {
    type: GET_EVICTION_FAILURE,
    payload: { error },
  };
};
export const addEvictionRequest = (
  prop: AddEvictionRequestPayload
): AddEvictionRequestProp => {
  return {
    type: ADD_EVICTION_REQUEST,
    payload: prop,
  };
};

export const addEvictionSuccess = (
  prop: GetEvictionSuccessPayload
): AddEvictionSuccessProps => {
  return {
    type: ADD_EVICTION_SUCCESS,
    payload: prop,
  };
};

export const addEvictionFailure = (error: string): AjaxError => {
  return {
    type: ADD_EVICTION_FAILURE,
    payload: { error },
  };
};

export const addEvictionLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: ADD_EVICTION_LOADING_INDICATOR,
    payload: { loading },
  };
};
export const updateEvictionRequest = (
  prop: UpdateEvictionRequestPayload
): UpdateEvictionRequestProp => {
  return {
    type: UPDATE_EVICTION_REQUEST,
    payload: prop,
  };
};

export const updateEvictionSuccess = (
  prop: GetEvictionSuccessPayload
): UpdateEvictionSuccessProps => {
  return {
    type: UPDATE_EVICTION_SUCCESS,
    payload: prop,
  };
};

export const updateEvictionFailure = (error: string): AjaxError => {
  return {
    type: UPDATE_EVICTION_FAILURE,
    payload: { error },
  };
};

export const updateEvictionLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: UPDATE_EVICTION_LOADING_INDICATOR,
    payload: { loading },
  };
};

export const changeEvictionStateRequest = (
  prop: ChangeEvictionStateRequestPayload
): ChangeEvictionStateRequestProp => {
  return {
    type: CHANGE_EVICTION_STATUS_REQUEST,
    payload: prop,
  };
};

export const changeEvictionStateSuccess = (
  prop: ChangeEvictionStateSuccessPayload
): ChangeEvictionStateSuccessProps => {
  return {
    type: CHANGE_EVICTION_STATUS_SUCCESS,
    payload: prop,
  };
};

export const changeEvictionStateFailure = (error: string): AjaxError => {
  return {
    type: CHANGE_EVICTION_STATUS_FAILURE,
    payload: { error },
  };
};

export const getCurrentEvictionRequest = (
  prop: GetCurrentEvictionRequestPayload
): GetCurrentEvictionRequestProp => {
  return {
    type: GET_CURRENT_EVICTION_REQUEST,
    payload: prop,
  };
};

export const getCurrentEvictionSuccess = (
  prop: GetCurrentEvictionSuccessPayload
): GetCurrentEvictionSuccessProp => {
  return {
    type: GET_CURRENT_EVICTION_SUCCESS,
    payload: prop,
  };
};

export const getCurrentEvictionFailure = (error: string): AjaxError => {
  return {
    type: GET_CURRENT_EVICTION_FAILURE,
    payload: { error },
  };
};
