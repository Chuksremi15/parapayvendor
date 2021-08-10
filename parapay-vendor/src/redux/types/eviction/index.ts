import { ContestantsProps } from "../contestant";
import { SuccessResponse, ObjectId, Type, Token } from "../global";
export interface ContestantUpForEvictionProps {
  createdAt: string;
  eviction: ObjectId;
  updatedAt: string;
  vendor: ObjectId;
  vote: number;
  vote_cost: number;
  contestant: ContestantsProps;
  _id: ObjectId;
}

export interface EvictionProps {
  _id: ObjectId;
  status: "active" | "pending";
  vendor: ObjectId;
  title: string;
  banner: string;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  contestants: ContestantUpForEvictionProps[];
}

export type GetEvictionsRequestPayload = Token;

export interface GetEvictionRequestPayload extends Token {
  id: ObjectId;
}

export interface AddEvictionRequestPayload extends Token {
  data: any;
}

export interface UpdateEvictionRequestPayload extends Token {
  data: any;
  id: ObjectId;
}
export interface ChangeEvictionStateRequestPayload extends Token {
  data: {
    status: string;
  };
  id: ObjectId;
}
export type ChangeEvictionStateSuccessPayload = SuccessResponse;

export interface ChangeEvictionStateRequestProp extends Type {
  payload: ChangeEvictionStateRequestPayload;
}

export interface AddEvictionRequestProp extends Type {
  payload: AddEvictionRequestPayload;
}
export interface UpdateEvictionRequestProp extends Type {
  payload: UpdateEvictionRequestPayload;
}

export interface GetEvictionsSuccessPayload extends SuccessResponse {
  evictions: EvictionProps[];
}
export interface GetEvictionSuccessPayload extends SuccessResponse {
  eviction: EvictionProps;
}

export type GetCurrentEvictionRequestPayload = Token;
export type GetCurrentEvictionSuccessPayload = SuccessResponse;

export interface GetEvictionsRequestProps extends Type {
  payload: GetEvictionsRequestPayload;
}
export interface GetEvictionRequestProps extends Type {
  payload: GetEvictionRequestPayload;
}

export interface GetEvictionsSuccessProps extends Type {
  payload: GetEvictionsSuccessPayload;
}
export interface GetEvictionSuccessProps extends Type {
  payload: GetEvictionSuccessPayload;
}
export interface AddEvictionSuccessProps extends Type {
  payload: GetEvictionSuccessPayload;
}
export interface UpdateEvictionSuccessProps extends Type {
  payload: GetEvictionSuccessPayload;
}
export interface ChangeEvictionStateSuccessProps extends Type {
  payload: ChangeEvictionStateSuccessPayload;
}
export interface GetCurrentEvictionRequestProp extends Type {
  payload: GetCurrentEvictionRequestPayload;
}
export interface GetCurrentEvictionSuccessProp extends Type {
  payload: GetCurrentEvictionSuccessPayload;
}
// Contestant Action Type
export type EvictionActions = GetEvictionsSuccessProps &
  GetEvictionSuccessProps &
  ChangeEvictionStateSuccessProps &
  GetCurrentEvictionSuccessProp;
