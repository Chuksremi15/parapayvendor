import axios, { AxiosInstance, AxiosResponse } from "axios";
import { store, logout, SuccessResponse, dispatchError } from "../../index";
// import
export const BASE_URL = "https://parapay.herokuapp.com/api/v1";
export const DIGITIAL_BASE_URL = "https://parapay.herokuapp.com/api/v1";

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    switch (err.response.status) {
      case 503:
      case 500:
      case 506:
        const { status, statusText } = err.response;
        store.dispatch(dispatchError({ status, statusText }));
        break;
      default:
        break;
    }
    if (err.response) {
      console.log("Yes it has expired");
      if (err.response.data.message === "Unauthenticated") {
        console.log("Yes it has expired");
        store.dispatch(logout());
      }
    }
    return Promise.reject(err);
  }
);

export type APISuccessResponse<T = undefined> = T extends undefined
  ? SuccessResponse & { [name: string]: any }
  : SuccessResponse & T;
export type AxiosReturnType<T = undefined> = T extends undefined
  ? AxiosResponse<SuccessResponse & { [name: string]: any }>
  : AxiosResponse<APISuccessResponse<T>>;

export default instance;
