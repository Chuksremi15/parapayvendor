import { SuccessResponse, ObjectId, Type, Token } from "../global";

export interface AddContestantRequestPayload extends Token {
  data: any;
}

export interface ContestantsProps {
  _id: ObjectId;
  status: "active" | "inactive";
  vendor: ObjectId;
  firstname: string;
  lastname: string;
  nickname: string;
  gender: string;
  contestant_image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type GetContestantsRequestPayload = Token;

export interface GetContestantRequestPayload extends Token {
  id: ObjectId;
}
export interface UpdateContestantRequestPayload
  extends AddContestantRequestPayload {
  id: ObjectId;
}

export interface ManageContestantRequestPayload extends Token {
  data: {
    status: string;
  };
  id: ObjectId;
}

export interface ManageContestantSuccessPayload extends SuccessResponse {
  contestant: ContestantsProps;
}

export interface GetContestantsRequestProp extends Type {
  payload: GetContestantsRequestPayload;
}
export interface GetContestantRequestProp extends Type {
  payload: GetContestantRequestPayload;
}

export interface GetContestantsSuccessPayload extends SuccessResponse {
  contestants: ContestantsProps[];
}
export interface GetContestantSuccessPayload extends SuccessResponse {
  contestant: ContestantsProps;
}
export interface UpdateContestantSuccessPayload extends SuccessResponse {
  contestant: ContestantsProps;
}
export interface AddContestantSuccessPayload extends SuccessResponse {
  contestant: ContestantsProps;
}

export interface GetContestantsSuccessProps extends Type {
  payload: GetContestantsSuccessPayload;
}
export interface GetContestantSuccessProps extends Type {
  payload: GetContestantSuccessPayload;
}
export interface AddContestantSuccessProp extends Type {
  payload: AddContestantSuccessPayload;
}
export interface UpdateContestantSuccessProp extends Type {
  payload: UpdateContestantSuccessPayload;
}

export interface AddContestantsRequestProp extends Type {
  payload: AddContestantRequestPayload;
}
export interface UpdateContestantsRequestProp extends Type {
  payload: UpdateContestantRequestPayload;
}

export interface ManageContestantRequestProp extends Type {
  payload: ManageContestantRequestPayload;
}
export interface ManageContestantSuccessProp extends Type {
  payload: ManageContestantSuccessPayload;
}

// Contestant Action Type
export type ContestantActions = GetContestantsSuccessProps &
  AddContestantSuccessProp &
  UpdateContestantSuccessProp &
  ManageContestantSuccessProp;
