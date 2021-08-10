import { call, put, takeLatest, spawn } from "redux-saga/effects";

import { clientErrorMessage, delay, sendMediaToS3 } from "../reusables";

import axios, { APISuccessResponse, AxiosReturnType } from "../axios";
import {
  GET_DASHBOARD_STARTS_REQUEST,
  GetDashboardStartsRequestPayload,
  GetWalletHistoryRequestPayload,
  GET_WALLET_HISTORY_REQUEST,
} from "../../types";
import {
  getDashboardStartsFailure,
  getDashboardStartsRequest,
  getDashboardStartsSuccess,
  getDashboardStartsLoadingIndicator,
  getWalletHistoryRequest,
  getWalletHistoryLoadingIndicator,
  getWalletHistorySuccess,
  getWalletHistoryFailure,
} from "../../actions";

const ajaxDBCalls = {
  getDashboardStarts: async ({
    token,
  }: GetDashboardStartsRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      `/vendor/dashboard/statistics`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  getWalletHistory: async ({
    token,
  }: GetWalletHistoryRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      `/vendor/dashboard/wallet-history`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
};

//Generators
function* getDashboardStarts({
  payload,
}: ReturnType<typeof getDashboardStartsRequest>) {
  try {
    yield put(getDashboardStartsLoadingIndicator(true));
    const {
      data: { dashboard_data, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getDashboardStarts, payload);
    yield put(getDashboardStartsSuccess({ dashboard_data, ...rest }));
    yield put(getDashboardStartsLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getDashboardStartsFailure(errorMessage));
    yield put(getDashboardStartsLoadingIndicator(false));
  }
}
function* getWalletHistory({
  payload,
}: ReturnType<typeof getWalletHistoryRequest>) {
  try {
    yield put(getWalletHistoryLoadingIndicator(true));
    const {
      data: { transactions, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getWalletHistory, payload);
    yield put(getWalletHistorySuccess({ transactions, ...rest }));
    yield put(getWalletHistoryLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getWalletHistoryFailure(errorMessage));
    yield put(getWalletHistoryLoadingIndicator(false));
  }
}

// Watchers
function* getDashboardStartsWatcher(): IterableIterator<any> {
  yield takeLatest(GET_DASHBOARD_STARTS_REQUEST, getDashboardStarts);
}
function* getWalletHistoryWatcher(): IterableIterator<any> {
  yield takeLatest(GET_WALLET_HISTORY_REQUEST, getWalletHistory);
}

export default function* dashboardStartsSagas() {
  yield spawn(getDashboardStartsWatcher);
  yield spawn(getWalletHistoryWatcher);
}
