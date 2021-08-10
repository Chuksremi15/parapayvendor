import { SuccessResponse, Type, Token } from "../global";

export interface BankProps {
  bankname: string;
  bankcode: string;
}

export type GetBanksRequestPayload = Token;

export interface GetBanksSuccessPayload extends SuccessResponse {
  banklist: BankProps[];
}

export interface GetBanksRequestProp extends Type {
  payload: GetBanksRequestPayload;
}
export interface GetBanksSuccessProp extends Type {
  payload: GetBanksSuccessPayload;
}

// Misc Action Type
export type MiscActions = GetBanksSuccessProp;
