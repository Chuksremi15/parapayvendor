import { call, put, takeLatest, spawn } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LoginRequestPayload,
  LoginSuccessPayload,
} from "../../types";
import {
  loginSuccess,
  loginFailure,
  loginRequest,
  loginLoadingIndicator,
} from "../../actions";
import axios, { APISuccessResponse, AxiosReturnType } from "../axios";
import { clientErrorMessage, delay } from "../reusables";

const ajaxDBCalls = {
  login: async (
    payload: LoginRequestPayload
  ): Promise<AxiosReturnType<LoginSuccessPayload>> => {
    const response = await axios.post<APISuccessResponse<LoginSuccessPayload>>(
      "/vendor/auth/login",
      payload
    );
    return response;
  },
};

// Generators
function* login({ payload }: ReturnType<typeof loginRequest>) {
  try {
    yield put(loginLoadingIndicator(true));
    const {
      data: {
        data: { user },
        ...rest
      },
    }: AxiosReturnType = yield call(ajaxDBCalls.login, payload);
    yield put(loginSuccess({ user, ...rest, token: user.token }));
    yield put(loginLoadingIndicator(false));
  } catch (err) {
    let errorMessage = "";
    if (err.request) errorMessage = clientErrorMessage;
    if (err.response) {
      console.log("something is wrong", err.response.data);
      const { message } = err.response.data;
      errorMessage = message;
    }
    console.log("error", err);
    console.log("error", err);
    yield put(loginFailure(errorMessage));
    yield put(loginLoadingIndicator(false));
    yield call(delay);
    yield put(loginFailure(""));
  }
}

// Watchers
function* loginWatcher(): IterableIterator<any> {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* authSagas() {
  yield spawn(loginWatcher);
}
