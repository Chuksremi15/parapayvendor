import { SuccessResponse, ObjectId, Type, Token } from "../global";

export interface VoteSettingsProps {
  max_vote_per_time: string;
  vote_cost: string;
  contestant_referral_to_vote: string;
  contestant_has_referral_vote: boolean;
  _id: ObjectId;
  vendor: ObjectId;
  createdAt: string;
  updatedAt: string;
}

export type GetVoteSettingsRequestPayload = Token;

export interface GetVoteSettingsSuccessPayload extends SuccessResponse {
  vote_settings: VoteSettingsProps;
}

export interface UpdateVoteSettingsRequestPayload extends Token {
  data: Partial<VoteSettingsProps>;
}
export type UpdateVoteSettingsSuccessPayload = GetVoteSettingsSuccessPayload;

export interface GetVoteSettingsRequestProp extends Type {
  payload: GetVoteSettingsRequestPayload;
}
export interface GetVoteSettingsSuccessProp extends Type {
  payload: GetVoteSettingsSuccessPayload;
}
export interface UpdateVoteSettingsSuccessProp extends Type {
  payload: UpdateVoteSettingsSuccessPayload;
}

export interface UpdateVoteSettingsRequestProp extends Type {
  payload: UpdateVoteSettingsRequestPayload;
}

// Contestant Action Type
export type VoteSettingsActions = GetVoteSettingsSuccessProp &
  UpdateVoteSettingsSuccessProp;
