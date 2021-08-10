import { SuccessResponse, Type, ObjectId, Token } from "../global";

// Payloads
export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface UserDetailsProps {
  _id: ObjectId;
  email: string;
  fullname: string;
  phone: string;
  user_type: string;
  user_status: string;
  profile_image: string;
}

export interface LoginSuccessPayload extends SuccessResponse, Token {
  user: UserDetailsProps;
}

// Login action types
export interface LoginRequestProp extends Type {
  payload: LoginRequestPayload;
}

export interface LoginSuccessProp extends Type {
  payload: LoginSuccessPayload;
}

export type Logout = Type;

export type AuthActions = LoginSuccessProp;
