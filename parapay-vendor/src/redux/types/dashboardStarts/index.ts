import { SuccessResponse, ObjectId, Type, Token } from "../global";

export interface DashBoardStatsProps {
  _id: ObjectId;
  no_of_contestant: number;
  no_of_evicted_contestants: number;
  total_no_of_votes: number;
  total_value_of_votes: number;
}

export interface WalletHistoryProps {
  _id: ObjectId;
  name: string;
  amount: number;
  vendor_image: string;
  actor_name: string;
  transaction_type: string;
  transaction_id: string;
  mode: string;
  medium: string;
  transaction_description: string;
  status: string;
  created_at: string;
  label: string;
  parapay_fee: number;
  processing_fee: number;
  third_party_resp: string;
  third_party_resp_message: string;
}

export type GetDashboardStartsRequestPayload = Token;
export type GetWalletHistoryRequestPayload = Token;

export interface GetDashboardStartsRequestProp extends Type {
  payload: GetDashboardStartsRequestPayload;
}
export interface GetWalletHistoryRequestProp extends Type {
  payload: GetWalletHistoryRequestPayload;
}

export interface GetDashboardStartsSuccessPayload extends SuccessResponse {
  dashboard_data: DashBoardStatsProps;
}
export interface GetWalletHistorySuccessPayload extends SuccessResponse {
  transactions: WalletHistoryProps[];
}

export interface GetDashboardStartsSuccessProp extends Type {
  payload: GetDashboardStartsSuccessPayload;
}
export interface GetWalletHistorySuccessProp extends Type {
  payload: GetWalletHistorySuccessPayload;
}

// Contestant Action Type
export type DashboardStartsActions = GetDashboardStartsSuccessProp &
  GetWalletHistorySuccessProp;
