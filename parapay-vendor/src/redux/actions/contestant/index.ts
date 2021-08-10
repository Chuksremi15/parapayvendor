import {
  GET_CONTESTANTS,
  GetContestantsRequestProp,
  AjaxError,
  GET_CONTESTANTS_SUCCESS,
  GET_CONTESTANTS_FAILURE,
  GET_CONTESTANT_REQUEST,
  GET_CONTESTANT_SUCCESS,
  GET_CONTESTANT_FAILURE,
  UPDATE_CONTESTANT_REQUEST,
  UPDATE_CONTESTANT_SUCCESS,
  UPDATE_CONTESTANT_FAILURE,
  GetContestantsSuccessProps,
  GetContestantsSuccessPayload,
  GetContestantsRequestPayload,
  AddContestantsRequestProp,
  AddContestantRequestPayload,
  ADD_CONTESTANT_REQUEST,
  AddContestantSuccessProp,
  AddContestantSuccessPayload,
  ADD_CONTESTANT_SUCCESS,
  ADD_CONTESTANT_FAILURE,
  GetContestantSuccessPayload,
  GetContestantSuccessProps,
  GetContestantRequestPayload,
  GetContestantRequestProp,
  UpdateContestantRequestPayload,
  UpdateContestantsRequestProp,
  UpdateContestantSuccessProp,
  UpdateContestantSuccessPayload,
  ManageContestantRequestPayload,
  ManageContestantRequestProp,
  ManageContestantSuccessPayload,
  ManageContestantSuccessProp,
  MANAGE_CONTESTANT_FAILURE,
  MANAGE_CONTESTANT_REQUEST,
  MANAGE_CONTESTANT_SUCCESS,
  GET_CONTESTANTS_LOADING_INDICATOR,
  LoadingIndicatorProp,
  MANAGE_CONTESTANT_LOADING_INDICATOR,
  GET_EVICTED_CONTESTANTS_REQUEST,
  GET_EVICTED_CONTESTANTS_LOADING_INDICATOR,
  GET_EVICTED_CONTESTANTS_SUCCESS,
  GET_EVICTED_CONTESTANTS_FAILURE,
} from "../../types";

export const getContestantRequest = (
  prop: GetContestantRequestPayload
): GetContestantRequestProp => {
  return {
    type: GET_CONTESTANT_REQUEST,
    payload: prop,
  };
};

export const getContestantSuccess = (
  prop: GetContestantSuccessPayload
): GetContestantSuccessProps => {
  return {
    type: GET_CONTESTANT_SUCCESS,
    payload: prop,
  };
};

export const getContestantFailure = (error: string): AjaxError => {
  return {
    type: GET_CONTESTANT_FAILURE,
    payload: { error },
  };
};
export const getContestantsRequest = (
  prop: GetContestantsRequestPayload
): GetContestantsRequestProp => {
  return {
    type: GET_CONTESTANTS,
    payload: prop,
  };
};
export const getEvictedContestantsRequest = (
  prop: GetContestantsRequestPayload
): GetContestantsRequestProp => {
  return {
    type: GET_EVICTED_CONTESTANTS_REQUEST,
    payload: prop,
  };
};

export const getEvictedContestantsLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: GET_EVICTED_CONTESTANTS_LOADING_INDICATOR,
    payload: { loading },
  };
};
export const getContestantsLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: GET_CONTESTANTS_LOADING_INDICATOR,
    payload: { loading },
  };
};

export const getEvictedContestantsSuccess = (
  prop: GetContestantsSuccessPayload
): GetContestantsSuccessProps => {
  return {
    type: GET_EVICTED_CONTESTANTS_SUCCESS,
    payload: prop,
  };
};
export const getContestantsSuccess = (
  prop: GetContestantsSuccessPayload
): GetContestantsSuccessProps => {
  return {
    type: GET_CONTESTANTS_SUCCESS,
    payload: prop,
  };
};

export const getEvictedContestantsFailure = (error: string): AjaxError => {
  return {
    type: GET_EVICTED_CONTESTANTS_FAILURE,
    payload: { error },
  };
};
export const getContestantsFailure = (error: string): AjaxError => {
  return {
    type: GET_CONTESTANTS_FAILURE,
    payload: { error },
  };
};

export const addContestantRequest = (
  prop: AddContestantRequestPayload
): AddContestantsRequestProp => {
  return {
    type: ADD_CONTESTANT_REQUEST,
    payload: prop,
  };
};
export const addContestantSuccess = (
  prop: AddContestantSuccessPayload
): AddContestantSuccessProp => {
  return {
    type: ADD_CONTESTANT_SUCCESS,
    payload: prop,
  };
};

export const addContestantFailure = (error: string): AjaxError => {
  return {
    type: ADD_CONTESTANT_FAILURE,
    payload: { error },
  };
};

export const updateContestantRequest = (
  prop: UpdateContestantRequestPayload
): UpdateContestantsRequestProp => {
  return {
    type: UPDATE_CONTESTANT_REQUEST,
    payload: prop,
  };
};
export const updateContestantSuccess = (
  prop: UpdateContestantSuccessPayload
): UpdateContestantSuccessProp => {
  return {
    type: UPDATE_CONTESTANT_SUCCESS,
    payload: prop,
  };
};

export const updateContestantFailure = (error: string): AjaxError => {
  return {
    type: UPDATE_CONTESTANT_FAILURE,
    payload: { error },
  };
};

export const manageContestantRequest = (
  prop: ManageContestantRequestPayload
): ManageContestantRequestProp => {
  return {
    type: MANAGE_CONTESTANT_REQUEST,
    payload: prop,
  };
};
export const manageContestantSuccess = (
  prop: ManageContestantSuccessPayload
): ManageContestantSuccessProp => {
  return {
    type: MANAGE_CONTESTANT_SUCCESS,
    payload: prop,
  };
};

export const manageContestantFailure = (error: string): AjaxError => {
  return {
    type: MANAGE_CONTESTANT_FAILURE,
    payload: { error },
  };
};

export const manageContestantLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: MANAGE_CONTESTANT_LOADING_INDICATOR,
    payload: { loading },
  };
};
