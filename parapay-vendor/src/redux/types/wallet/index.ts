import { SuccessResponse, ObjectId, Type, Token } from "../global";

export interface BankDetailsProps {
  bank_name: string;
  account_name: string;
  account_number: string;
  bank_code: string;
  _id: ObjectId;
  user: ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface WalletDetailsProps {
  has_set_wallet_pin: boolean;
  status: string;
  status_message: string;
  account_number: string;
  balance: number | string;
  available_balance: number | string;
  upgrade_in_process: false;
  account_tier: {
    id: ObjectId;
    name: string;
    level: number;
    maximum_balance: number | string;
    description: string;
    has_daily_transfer_limit: true;
    upgradable: true;
    daily_transfer_limit: number | string;
  };
  _id: ObjectId;
  bank_details: BankDetailsProps | null;
}
export type GetWalletDetailsRequestPayload = Token;

export interface SaveWalletDetailsRequestPayload extends Token {
  data: {
    bank_name: string;
    bank_code: string;
    account_number: string;
    account_name: string;
  };
}

export interface SetWalletPinRequestPayload extends Token {
  data: {
    old_pin: string;
    new_pin: string;
    confirm_new_pin: string;
  };
}

export interface WithdrawalRequestPayload extends Token {
  data: {
    amount: string;
    pin: string;
  };
}

export type WithdrawalSuccessPayload = SuccessResponse;
export interface SetWalletPinRequestProp extends Type {
  payload: SetWalletPinRequestPayload;
}

export type SetWalletPinSuccesspayload = SuccessResponse;
export interface WithdrawalRequestProp extends Type {
  payload: WithdrawalRequestPayload;
}

export interface GetWalletDetailsSuccessPayload extends SuccessResponse {
  vendor_wallet: WalletDetailsProps;
}
export type SaveWalletDetailsSuccessPayload = SuccessResponse;

export interface GetWalletDetailsRequestProps extends Type {
  payload: GetWalletDetailsRequestPayload;
}
export interface SaveWalletDetailsRequestProps extends Type {
  payload: SaveWalletDetailsRequestPayload;
}

export interface GetWalletDetailsSuccessProps extends Type {
  payload: GetWalletDetailsSuccessPayload;
}
export interface SaveWalletDetailsSuccessProps extends Type {
  payload: SaveWalletDetailsSuccessPayload;
}
export interface SetWalletPinSuccessProps extends Type {
  payload: SetWalletPinSuccesspayload;
}
export interface WithdrawalSuccessProps extends Type {
  payload: WithdrawalSuccessPayload;
}
// Contestant Action Type
export type WalletActions = GetWalletDetailsSuccessProps &
  SaveWalletDetailsSuccessProps &
  WithdrawalSuccessProps &
  SetWalletPinSuccessProps;
