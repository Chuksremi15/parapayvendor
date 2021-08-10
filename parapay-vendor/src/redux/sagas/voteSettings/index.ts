import { call, put, takeLatest, spawn } from "redux-saga/effects";

import {
  GET_EVICTIONS_REQUEST,
  UPDATE_EVICTION_REQUEST,
  GetVoteSettingsRequestPayload,
  UpdateVoteSettingsRequestPayload,
  UPDATE_VOTE_SETTINGS_REQUEST,
  GET_VOTE_SETTINGS_REQUEST,
} from "../../types";

import {
  getVoteSettingsRequest,
  getVoteSettingsSuccess,
  getVoteSettingsFailure,
  updateVoteSettingsRequest,
  updateVoteSettingsSuccess,
  updateVoteSettingsFailure,
  updateVoteSettingsLoadingIndicator,
} from "../../actions";

import { clientErrorMessage, delay } from "../reusables";

import axios, { APISuccessResponse, AxiosReturnType } from "../axios";

const ajaxDBCalls = {
  getVoteSettings: async ({
    token,
  }: GetVoteSettingsRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      "/vendor/settings/fetch",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  updateVoteSettings: async ({
    token,
    data,
  }: UpdateVoteSettingsRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.put<APISuccessResponse>(
      `/vendor/settings/update`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
};

//Generators
function* getVoteSettings({
  payload,
}: ReturnType<typeof getVoteSettingsRequest>) {
  try {
    const {
      data: { vote_settings, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getVoteSettings, payload);
    yield put(getVoteSettingsSuccess({ vote_settings, ...rest }));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getVoteSettingsFailure(errorMessage));
  }
}

function* updateVoteSettings({
  payload,
}: ReturnType<typeof updateVoteSettingsRequest>) {
  try {
    yield put(updateVoteSettingsLoadingIndicator(true));
    const {
      data: { vote_settings, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.updateVoteSettings, payload);

    yield put(updateVoteSettingsSuccess({ vote_settings, ...rest }));
    yield put(updateVoteSettingsLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(updateVoteSettingsFailure(errorMessage));
    yield put(updateVoteSettingsLoadingIndicator(false));
    yield put(updateVoteSettingsFailure(""));
  }
}

// Watchers
function* getVoteSettingsWatcher(): IterableIterator<any> {
  yield takeLatest(GET_VOTE_SETTINGS_REQUEST, getVoteSettings);
}
function* updateVoteSettingsWatcher(): IterableIterator<any> {
  yield takeLatest(UPDATE_VOTE_SETTINGS_REQUEST, updateVoteSettings);
}
export default function* voteSettingsSagas() {
  yield spawn(getVoteSettingsWatcher);
  yield spawn(updateVoteSettingsWatcher);
}
