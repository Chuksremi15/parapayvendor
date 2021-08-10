import {
  AuthActions,
  LOGIN_SUCCESS,
  LOGOUT,
  UserDetailsProps,
} from "../../types";

export type AccountStore = {
  user?: UserDetailsProps;
};
const initialState = (): AccountStore => ({});

export const accountReducer = (
  prevState: AccountStore = initialState(),
  { type, payload }: AuthActions
): AccountStore => {
  switch (type) {
    case LOGIN_SUCCESS:
      const { user } = payload;
      prevState.user = user;
      return { ...prevState };
    case LOGOUT:
      return initialState();
    default:
      return prevState;
  }
};
