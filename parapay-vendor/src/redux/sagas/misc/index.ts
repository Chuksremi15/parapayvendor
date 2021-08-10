import { call, put, takeLatest, spawn } from "redux-saga/effects";

import { GetBanksRequestPayload, GET_BANKS_REQUEST } from "../../types";

import {
  getBanksSuccess,
  getBanksFailure,
  getBanksLoadingIndicator,
  getBanksRequest,
} from "../../actions";

import { clientErrorMessage } from "../reusables";

import axios, { APISuccessResponse, AxiosReturnType } from "../axios";

const ajaxDBCalls = {
  getBanks: async ({
    token,
  }: GetBanksRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      "/vendor/wallet/bank-list",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
};

//Generators
function* getBanks({ payload }: ReturnType<typeof getBanksRequest>) {
  try {
    yield put(getBanksLoadingIndicator(true));
    const {
      data: { banklist, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getBanks, payload);
    yield put(getBanksSuccess({ banklist, ...rest }));
    yield put(getBanksLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getBanksFailure(errorMessage));
    yield put(getBanksLoadingIndicator(false));
  }
}

// Watchers
function* getBanksWatcher(): IterableIterator<any> {
  yield takeLatest(GET_BANKS_REQUEST, getBanks);
}
export default function* miscSagas() {
  yield spawn(getBanksWatcher);
}
