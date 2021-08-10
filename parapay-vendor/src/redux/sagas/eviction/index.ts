import { call, put, takeLatest, spawn } from "redux-saga/effects";

import {
  GET_EVICTIONS_REQUEST,
  GET_EVICTION_REQUEST,
  ADD_EVICTION_REQUEST,
  UPDATE_EVICTION_REQUEST,
  CHANGE_EVICTION_STATUS_REQUEST,
  GetEvictionsRequestPayload,
  GetEvictionRequestPayload,
  AddEvictionRequestPayload,
  UpdateEvictionRequestPayload,
  ChangeEvictionStateRequestPayload,
  GetCurrentEvictionRequestPayload,
  GET_CURRENT_EVICTION_REQUEST,
} from "../../types";

import {
  getEvictionsRequest,
  getEvictionsSuccess,
  getEvictionsFailure,
  getEvictionRequest,
  getEvictionSuccess,
  getEvictionFailure,
  addEvictionRequest,
  addEvictionSuccess,
  addEvictionFailure,
  updateEvictionRequest,
  updateEvictionSuccess,
  updateEvictionFailure,
  changeEvictionStateRequest,
  changeEvictionStateSuccess,
  changeEvictionStateFailure,
  getCurrentEvictionFailure,
  getCurrentEvictionRequest,
  getCurrentEvictionSuccess,
  updateEvictionLoadingIndicator,
  addEvictionLoadingIndicator,
} from "../../actions";

import { clientErrorMessage, delay, sendMediaToS3 } from "../reusables";

import axios, { APISuccessResponse, AxiosReturnType } from "../axios";

const ajaxDBCalls = {
  getEvictions: async ({
    token,
  }: GetEvictionsRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      "/vendor/eviction/fetch",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  getEviction: async ({
    token,
    id,
  }: GetEvictionRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      `/vendor/eviction/${id}/show-eviction`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  addEviction: async ({
    token,
    data,
  }: AddEvictionRequestPayload): Promise<AxiosReturnType> => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        formData.append(`${key}`, JSON.stringify(value));
      } else {
        formData.append(`${key}`, data[key as string]);
      }
    });
    const response = await axios.post<APISuccessResponse>(
      "/vendor/eviction/create",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },
  updateEviction: async ({
    token,
    id,
    data,
  }: UpdateEvictionRequestPayload): Promise<AxiosReturnType> => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(`${key}`, val);
        });
      } else {
        formData.append(`${key}`, data[key as string]);
      }
    });
    const response = await axios.put<APISuccessResponse>(
      `/vendor/eviction/${id}/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },
  changeEvictionState: async ({
    token,
    id,
    data,
  }: ChangeEvictionStateRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.put<APISuccessResponse>(
      `/vendor/eviction/${id}/change-eviction-state`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  getCurrentEviction: async ({
    token,
  }: GetCurrentEvictionRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      `/vendor/eviction/current-eviction`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
};

//Generators
function* getEviction({ payload }: ReturnType<typeof getEvictionRequest>) {
  try {
    const {
      data: { eviction, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getEviction, payload);
    yield put(getEvictionSuccess({ eviction, ...rest }));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getEvictionFailure(errorMessage));
  }
}

function* getEvictions({ payload }: ReturnType<typeof getEvictionsRequest>) {
  try {
    const {
      data: { evictions, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getEvictions, payload);
    yield put(getEvictionsSuccess({ evictions, ...rest }));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getEvictionsFailure(errorMessage));
  }
}

function* addEviction({ payload }: ReturnType<typeof addEvictionRequest>) {
  try {
    yield put(addEvictionLoadingIndicator(true));
    // if (typeof payload.data.banner !== "string") {
    //   const {
    //     data: { url },
    //   } = yield call(sendMediaToS3, {
    //     file: payload.data.banner as File,
    //     token: payload.token as string,
    //   });
    //   payload.data.banner = url.file_url;
    // }

    const {
      data: { eviction, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.addEviction, payload);

    yield put(addEvictionSuccess({ eviction, ...rest }));
    yield put(addEvictionLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(addEvictionFailure(errorMessage));
    yield put(addEvictionLoadingIndicator(false));
  }
}

function* updateEviction({
  payload,
}: ReturnType<typeof updateEvictionRequest>) {
  yield put(updateEvictionLoadingIndicator(true));
  try {
    // if (typeof payload.data.banner !== "string") {
    //   const {
    //     data: { url },
    //   } = yield call(sendMediaToS3, {
    //     file: payload.data.banner as File,
    //     token: payload.token as string,
    //   });
    //   payload.data.banner = url.file_url;
    // }

    const {
      data: { eviction, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.updateEviction, payload);

    yield put(updateEvictionSuccess({ eviction, ...rest }));
    yield put(updateEvictionLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(updateEvictionFailure(errorMessage));
    yield put(updateEvictionLoadingIndicator(false));
  }
}

function* changeEvictionState({
  payload,
}: ReturnType<typeof changeEvictionStateRequest>) {
  try {
    const {
      data: { ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.changeEvictionState, payload);

    yield put(changeEvictionStateSuccess({ ...rest }));
    yield call(delay, 1000);
    yield put(changeEvictionStateSuccess({ message: "" }));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(changeEvictionStateFailure(errorMessage));
  }
}

function* getCurrentEviction({
  payload,
}: ReturnType<typeof getCurrentEvictionRequest>) {
  try {
    const {
      data: { ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getCurrentEviction, payload);

    yield put(getCurrentEvictionSuccess({ ...rest }));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getCurrentEvictionFailure(errorMessage));
  }
}

// Watchers
function* getEvictionWatcher(): IterableIterator<any> {
  yield takeLatest(GET_EVICTION_REQUEST, getEviction);
}
function* getEvictionsWatcher(): IterableIterator<any> {
  yield takeLatest(GET_EVICTIONS_REQUEST, getEvictions);
}
function* addEvictionWatcher(): IterableIterator<any> {
  yield takeLatest(ADD_EVICTION_REQUEST, addEviction);
}
function* updateEvictionWatcher(): IterableIterator<any> {
  yield takeLatest(UPDATE_EVICTION_REQUEST, updateEviction);
}
function* changeEvictionStateWatcher(): IterableIterator<any> {
  yield takeLatest(CHANGE_EVICTION_STATUS_REQUEST, changeEvictionState);
}
function* getCurrentEvictionWatcher(): IterableIterator<any> {
  yield takeLatest(GET_CURRENT_EVICTION_REQUEST, getCurrentEviction);
}
export default function* evictionManagementSagas() {
  yield spawn(getEvictionWatcher);
  yield spawn(getEvictionsWatcher);
  yield spawn(addEvictionWatcher);
  yield spawn(updateEvictionWatcher);
  yield spawn(changeEvictionStateWatcher);
  yield spawn(getCurrentEvictionWatcher);
}
