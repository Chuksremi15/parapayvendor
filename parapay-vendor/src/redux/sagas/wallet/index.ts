import { call, put, takeLatest, spawn } from "redux-saga/effects";

import {
  GetWalletDetailsRequestPayload,
  SaveWalletDetailsRequestPayload,
  SetWalletPinRequestPayload,
  WithdrawalRequestPayload,
  SAVE_WALLET_DETAILS_REQUEST,
  GET_WALLET_DETAILS_REQUEST,
  SET_WALLET_PIN_REQUEST,
  WITHDRAWAL_REQUEST,
} from "../../types";

import {
  getWalletDetailsRequest,
  getWalletDetailsSuccess,
  getWalletDetailsFailure,
  saveWalletDetailsRequest,
  saveWalletDetailsSuccess,
  saveWalletDetailsFailure,
  setWalletPinRequest,
  setWalletPinSuccess,
  setWalletPinFailure,
  withdrawalRequest,
  withdrawalSuccess,
  withdrawalFailure,
  saveWalletDetailsLoadingIndicator,
  getWalletDetailsLoadingIndicator,
  setWalletPinLoadingIndicator,
  withdrawalLoadingIndicator,
} from "../../actions";

import { clientErrorMessage, delay } from "../reusables";

import axios, { APISuccessResponse, AxiosReturnType } from "../axios";

const ajaxDBCalls = {
  getWalletDetails: async ({
    token,
  }: GetWalletDetailsRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.get<APISuccessResponse>(
      "/vendor/wallet/fetch-wallet-details",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  saveWalletDetails: async ({
    token,
    data,
  }: SaveWalletDetailsRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.put<APISuccessResponse>(
      `/vendor/wallet/save-bank-details`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  setWalletPin: async ({
    token,
    data,
  }: SetWalletPinRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.put<APISuccessResponse>(
      "/vendor/wallet/set-wallet-pin",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
  withdrawal: async ({
    token,
    data,
  }: WithdrawalRequestPayload): Promise<AxiosReturnType> => {
    const response = await axios.post<APISuccessResponse>(
      `/vendor/wallet/withdraw`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  },
};

//Generators
function* saveWalletDetails({
  payload,
}: ReturnType<typeof saveWalletDetailsRequest>) {
  try {
    yield put(saveWalletDetailsLoadingIndicator(true));
    const {
      data: { ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.saveWalletDetails, payload);
    yield put(saveWalletDetailsSuccess({ ...rest }));
    yield put(saveWalletDetailsLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(saveWalletDetailsFailure(errorMessage));
    yield put(saveWalletDetailsLoadingIndicator(false));
  }
}

function* getWalletDetails({
  payload,
}: ReturnType<typeof getWalletDetailsRequest>) {
  try {
    yield put(getWalletDetailsLoadingIndicator(true));
    const {
      data: { vendor_wallet, ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.getWalletDetails, payload);
    yield put(getWalletDetailsSuccess({ vendor_wallet, ...rest }));
    yield put(getWalletDetailsLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(getWalletDetailsFailure(errorMessage));
    yield put(getWalletDetailsLoadingIndicator(false));
  }
}

function* setWalletPin({ payload }: ReturnType<typeof setWalletPinRequest>) {
  try {
    yield put(setWalletPinLoadingIndicator(true));
    const {
      data: { ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.setWalletPin, payload);

    yield put(setWalletPinSuccess({ ...rest }));
    yield put(setWalletPinLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(setWalletPinFailure(errorMessage));
    yield put(setWalletPinLoadingIndicator(false));
  }
}

function* withdrawal({ payload }: ReturnType<typeof withdrawalRequest>) {
  try {
    yield put(withdrawalLoadingIndicator(true));
    const {
      data: { ...rest },
    }: AxiosReturnType = yield call(ajaxDBCalls.withdrawal, payload);

    yield put(withdrawalSuccess({ ...rest }));
    yield put(withdrawalLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    yield put(withdrawalFailure(errorMessage));
    yield put(withdrawalLoadingIndicator(false));
  }
}

// Watchers
function* saveWalletDetailsWatcher(): IterableIterator<any> {
  yield takeLatest(SAVE_WALLET_DETAILS_REQUEST, saveWalletDetails);
}
function* getWalletDetailsWatcher(): IterableIterator<any> {
  yield takeLatest(GET_WALLET_DETAILS_REQUEST, getWalletDetails);
}
function* setWalletPinWatcher(): IterableIterator<any> {
  yield takeLatest(SET_WALLET_PIN_REQUEST, setWalletPin);
}
function* withdrawalWatcher(): IterableIterator<any> {
  yield takeLatest(WITHDRAWAL_REQUEST, withdrawal);
}
export default function* walletManagementSagas() {
  yield spawn(saveWalletDetailsWatcher);
  yield spawn(getWalletDetailsWatcher);
  yield spawn(setWalletPinWatcher);
  yield spawn(withdrawalWatcher);
}
