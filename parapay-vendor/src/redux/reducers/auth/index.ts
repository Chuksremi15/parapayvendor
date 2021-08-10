import { AuthActions, LOGIN_SUCCESS, LOGOUT } from "../../types";

export interface AuthStore {
  token?: string;
  unVerifiedUser?: string;
  isLoggedIn?: boolean;
}
const initialState: AuthStore = {
  isLoggedIn: false,
};
export const authReducer = (
  prevState: AuthStore = initialState,
  { type, payload }: AuthActions
): AuthStore => {
  switch (type) {
    case LOGIN_SUCCESS:
      prevState.token = payload.token;
      prevState.isLoggedIn = true;
      return { ...prevState };
    case LOGOUT:
      prevState.token = undefined;
      prevState.isLoggedIn = false;
      return { ...prevState };
    default:
      return prevState;
  }
};
