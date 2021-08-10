import {
  AjaxError,
  GET_VOTE_SETTINGS_REQUEST,
  GET_VOTE_SETTINGS_SUCCESS,
  GET_VOTE_SETTINGS_FAILURE,
  UpdateVoteSettingsRequestPayload,
  UPDATE_VOTE_SETTINGS_REQUEST,
  UpdateVoteSettingsSuccessProp,
  UpdateVoteSettingsSuccessPayload,
  UPDATE_VOTE_SETTINGS_SUCCESS,
  UPDATE_VOTE_SETTINGS_FAILURE,
  GetVoteSettingsSuccessPayload,
  GetVoteSettingsSuccessProp,
  GetVoteSettingsRequestPayload,
  GetVoteSettingsRequestProp,
  UpdateVoteSettingsRequestProp,
  LoadingIndicatorProp,
  UPDATE_VOTE_SETTINGS_LOADING_INDICATOR,
} from "../../types";

export const getVoteSettingsRequest = (
  prop: GetVoteSettingsRequestPayload
): GetVoteSettingsRequestProp => {
  return {
    type: GET_VOTE_SETTINGS_REQUEST,
    payload: prop,
  };
};

export const getVoteSettingsSuccess = (
  prop: GetVoteSettingsSuccessPayload
): GetVoteSettingsSuccessProp => {
  return {
    type: GET_VOTE_SETTINGS_SUCCESS,
    payload: prop,
  };
};

export const getVoteSettingsFailure = (error: string): AjaxError => {
  return {
    type: GET_VOTE_SETTINGS_FAILURE,
    payload: { error },
  };
};

export const updateVoteSettingsRequest = (
  prop: UpdateVoteSettingsRequestPayload
): UpdateVoteSettingsRequestProp => {
  return {
    type: UPDATE_VOTE_SETTINGS_REQUEST,
    payload: prop,
  };
};
export const updateVoteSettingsSuccess = (
  prop: UpdateVoteSettingsSuccessPayload
): UpdateVoteSettingsSuccessProp => {
  return {
    type: UPDATE_VOTE_SETTINGS_SUCCESS,
    payload: prop,
  };
};

export const updateVoteSettingsFailure = (error: string): AjaxError => {
  return {
    type: UPDATE_VOTE_SETTINGS_FAILURE,
    payload: { error },
  };
};

export const updateVoteSettingsLoadingIndicator = (
  loading: boolean
): LoadingIndicatorProp => {
  return {
    type: UPDATE_VOTE_SETTINGS_LOADING_INDICATOR,
    payload: { loading },
  };
};
