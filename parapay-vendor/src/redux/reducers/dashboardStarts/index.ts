import {
  DashboardStartsActions,
  DashBoardStatsProps,
  GET_DASHBOARD_STARTS_SUCCESS,
  GET_WALLET_HISTORY_SUCCESS,
  WalletHistoryProps,
} from "../../types";

export type DashboardStartsStore = {
  dashboard_data?: DashBoardStatsProps;
  dashboardStartsLoading: boolean;
  transactions: WalletHistoryProps[];
  walletHistoryLoading: boolean;
};

const initialState = (): DashboardStartsStore => ({
  dashboardStartsLoading: true,
  transactions: [],
  walletHistoryLoading: true,
});

export const dashboardStartsReducer = (
  prevState: DashboardStartsStore = initialState(),
  { type, payload }: DashboardStartsActions
): DashboardStartsStore => {
  switch (type) {
    case GET_DASHBOARD_STARTS_SUCCESS:
      prevState.dashboard_data = payload.dashboard_data;
      prevState.dashboardStartsLoading = false;
      return { ...prevState };

    case GET_WALLET_HISTORY_SUCCESS:
      prevState.transactions = payload.transactions;
      prevState.walletHistoryLoading = false;
      return { ...prevState };
    default:
      return prevState;
  }
};
