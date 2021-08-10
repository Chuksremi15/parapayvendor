import { call, put, takeLatest, spawn } from "redux-saga/effects";

import {
  GET_CONTESTANTS,
  GET_CONTESTANT_REQUEST,
  GetContestantsRequestPayload,
  AddContestantRequestPayload,
  ADD_CONTESTANT_REQUEST,
  GetContestantRequestPayload,
  UpdateContestantRequestPayload,
  UPDATE_CONTESTANT_REQUEST,
  ManageContestantRequestPayload,
  MANAGE_CONTESTANT_REQUEST,
  GET_EVICTED_CONTESTANTS_REQUEST,
} from "../../types";

import {
  getContestantsRequest,
  getContestantsSuccess,
  getContestantsFailure,
  addContestantRequest,
  addContestantSuccess,
  addContestantFailure,
  getContestantRequest,
  getContestantSuccess,
  updateContestantRequest,
  updateContestantSuccess,
  updateContestantFailure,
  getContestantFailure,
  manageContestantFailure,
  manageContestantRequest,
  manageContestantSuccess,
  loginLoadingIndicator,
  getContestantsLoadingIndicator,
  manageContestantLoadingIndicator,
  getEvictedContestantsLoadingIndicator,
  getEvictedContestantsSuccess,
  getEvictedContestantsFailure,
} from "../../actions";

import { clientErrorMessage, delay, sendMediaToS3 } from "../reusables";

import axios, { APISuccessResponse, AxiosReturnType } from "../axios";
import { object } from "yup";

const ajaxDBCalls = {
  getContestants: async ({
    token,
  }: GetContestantsRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      "/vendor/constestant/list",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  getEvictedContestants: async ({
    token,
  }: GetContestantsRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      "/vendor/constestant/list?status=evicted",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  getContestant: async ({
    token,
    id,
  }: GetContestantRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      `/vendor/constestant/${id}/show`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  addContestant: async ({ token, data }: any): Promise<AxiosReturnType> => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(`${key}`, data[key as string]);
    });
    const response = await axios.post<APISuccessResponse>(
      "/vendor/constestant/create",
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
  updateContestant: async ({
    token,
    id,
    data,
  }: UpdateContestantRequestPayload): Promise<AxiosReturnType> => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(`${key}`, data[key as string]);
    });
    const response = await axios.put<APISuccessResponse>(
      `/vendor/constestant/${id}/update`,
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
  manageContestant: async ({
    token,
    id,
    data,
  }: ManageContestantRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.put<APISuccessResponse>(
      `/vendor/constestant/${id}/manage`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
};

// Generators
function* getContestants({
  payload,
}: ReturnType<typeof getContestantsRequest>) {
  yield put(getContestantsLoadingIndicator(true));
  try {
    const {
      data: { contestants, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getContestants, payload);

    yield put(getContestantsSuccess({ contestants, ...rest }));

    yield put(getContestantsLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getContestantsFailure(errorMessage));

    yield put(getContestantsLoadingIndicator(false));
  }
}
function* getEvictedContestants({
  payload,
}: ReturnType<typeof getContestantsRequest>) {
  yield put(getEvictedContestantsLoadingIndicator(true));
  try {
    const {
      data: { contestants, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getEvictedContestants, payload);

    yield put(getEvictedContestantsSuccess({ contestants, ...rest }));

    yield put(getEvictedContestantsLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getEvictedContestantsFailure(errorMessage));

    yield put(getEvictedContestantsLoadingIndicator(false));
  }
}
function* getContestant({ payload }: ReturnType<typeof getContestantRequest>) {
  try {
    const {
      data: { contestant, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getContestant, payload);

    console.log({ contestant, ...rest });

    yield put(getContestantSuccess({ contestant, ...rest }));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getContestantFailure(errorMessage));
  }
}
function* addContestant({ payload }: ReturnType<typeof addContestantRequest>) {
  try {
    yield put(loginLoadingIndicator(true));
    // if (typeof payload.data.contestant_image !== "string") {
    //   const {
    //     data: { url },
    //   } = yield call(sendMediaToS3, {
    //     file: payload.data.contestant_image as File,
    //     token: payload.token as string,
    //   });
    //   payload.data.contestant_image = url.file_url;
    // }
    const {
      data: { contestant, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.addContestant, payload);

    console.log({ contestant, ...rest });

    yield put(addContestantSuccess({ contestant, ...rest }));
    yield put(loginLoadingIndicator(false));
    yield call(delay, 1000);
    yield put(addContestantSuccess({ contestant, ...rest, message: "" }));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(addContestantFailure(errorMessage));

    yield put(loginLoadingIndicator(false));
    yield call(delay);
    yield put(addContestantFailure(""));
  }
}

function* updateContestant({
  payload,
}: ReturnType<typeof updateContestantRequest>) {
  yield put(loginLoadingIndicator(true));
  try {
    // if (typeof payload.data.contestant_image !== "string") {
    //   const {
    //     data: { url },
    //   } = yield call(sendMediaToS3, {
    //     file: payload.data.contestant_image as File,
    //     token: payload.token as string,
    //   });
    //   payload.data.contestant_image = url.file_url;
    // }
    const {
      data: { contestant, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.updateContestant, payload);

    console.log({ contestant, ...rest });

    yield put(updateContestantSuccess({ contestant, ...rest }));
    yield put(loginLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(updateContestantFailure(errorMessage));

    yield put(loginLoadingIndicator(false));
    yield call(delay);
    yield put(addContestantFailure(""));
  }
}

function* manageContestant({
  payload,
}: ReturnType<typeof manageContestantRequest>) {
  try {
    yield put(manageContestantLoadingIndicator(true));
    const {
      data: { contestant, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.manageContestant, payload);

    yield put(manageContestantSuccess({ contestant, ...rest }));
    yield put(manageContestantLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(manageContestantFailure(errorMessage));
    yield put(manageContestantLoadingIndicator(false));
  }
}

// Watchers
function* getContestantsWatcher(): IterableIterator<any> {
  yield takeLatest(GET_CONTESTANTS, getContestants);
}
function* getEvictedContestantsWatcher(): IterableIterator<any> {
  yield takeLatest(GET_EVICTED_CONTESTANTS_REQUEST, getEvictedContestants);
}
function* addContestantWatcher(): IterableIterator<any> {
  yield takeLatest(ADD_CONTESTANT_REQUEST, addContestant);
}
function* getContestantWatcher(): IterableIterator<any> {
  yield takeLatest(GET_CONTESTANT_REQUEST, getContestant);
}
function* updateContestantWatcher(): IterableIterator<any> {
  yield takeLatest(UPDATE_CONTESTANT_REQUEST, updateContestant);
}

function* manageContestantWatcher(): IterableIterator<any> {
  yield takeLatest(MANAGE_CONTESTANT_REQUEST, manageContestant);
}
export default function* contestantManagementSagas() {
  yield spawn(getContestantsWatcher);
  yield spawn(addContestantWatcher);
  yield spawn(getContestantWatcher);
  yield spawn(updateContestantWatcher);
  yield spawn(manageContestantWatcher);
  yield spawn(getEvictedContestantsWatcher);
}
