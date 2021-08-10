import {
  LOGIN_LOADING_INDICATOR,
  GET_DASHBOARD_STARTS_LOADING_INDICATOR,
  GET_WALLET_HISTORY_LOADING_INDICATOR,
  GET_CONTESTANTS_LOADING_INDICATOR,
  MANAGE_CONTESTANT_LOADING_INDICATOR,
  LoadingIndicatorProp,
  GET_BANKS_LOADING_INDICATOR,
  SAVE_WALLET_DETAILS_LOADING_INDICATOR,
  GET_WALLET_DETAILS_LOADING_INDICATOR,
  SET_WALLET_PIN_LOADING_INDICATOR,
  WITHDRAWAL_LOADING_INDICATOR,
  UPDATE_EVICTION_LOADING_INDICATOR,
  CHANGE_EVICTION_STATUS_FAILURE,
  CHANGE_EVICTION_STATUS_LOADING_INDICATOR,
  ADD_EVICTION_LOADING_INDICATOR,
  GET_EVICTED_CONTESTANTS_LOADING_INDICATOR,
  UPDATE_VOTE_SETTINGS_LOADING_INDICATOR,
} from "../../types";

export interface LoadingIndicators {
  [key: string]: boolean;
}

const initialState: LoadingIndicators = {};

export const loadingIndicatorsReducer = (
  prevState: LoadingIndicators = initialState,
  { type, payload }: LoadingIndicatorProp
): LoadingIndicators => {
  switch (type) {
    // Auth Loading Indicators
    case LOGIN_LOADING_INDICATOR:
      prevState.login = payload.loading;
      return { ...prevState };
    case GET_DASHBOARD_STARTS_LOADING_INDICATOR:
      prevState.dashboardStarts = payload.loading;
      return { ...prevState };
    case GET_WALLET_HISTORY_LOADING_INDICATOR:
      prevState.walletHistory = payload.loading;
      return { ...prevState };
    case GET_CONTESTANTS_LOADING_INDICATOR:
      prevState.contestants = payload.loading;
      return { ...prevState };
    case MANAGE_CONTESTANT_LOADING_INDICATOR:
      prevState.manageContestant = payload.loading;
      return { ...prevState };
    // Misc
    case GET_BANKS_LOADING_INDICATOR:
      prevState.getBanks = payload.loading;
      return { ...prevState };

    //Wallet
    case SAVE_WALLET_DETAILS_LOADING_INDICATOR:
      prevState.saveWalletDetails = payload.loading;
      return { ...prevState };
    case GET_WALLET_DETAILS_LOADING_INDICATOR:
      prevState.getWalletDetails = payload.loading;
      return { ...prevState };
    case SET_WALLET_PIN_LOADING_INDICATOR:
      prevState.setWalletPin = payload.loading;
      return { ...prevState };
    case WITHDRAWAL_LOADING_INDICATOR:
      prevState.withdrawal = payload.loading;
      return { ...prevState };

    // Eviction
    case UPDATE_EVICTION_LOADING_INDICATOR:
      prevState.updateEviction = payload.loading;
      return { ...prevState };

    // Contestant
    case MANAGE_CONTESTANT_LOADING_INDICATOR:
      prevState.manageContestant = payload.loading;
      return { ...prevState };
    case CHANGE_EVICTION_STATUS_LOADING_INDICATOR:
      prevState.changeEvictionState = payload.loading;
      return { ...prevState };
    case ADD_EVICTION_LOADING_INDICATOR:
      prevState.addEviction = payload.loading;
      return { ...prevState };
    case GET_EVICTED_CONTESTANTS_LOADING_INDICATOR:
      prevState.evictedContestants = payload.loading;
      return { ...prevState };

    //Settings
    case UPDATE_VOTE_SETTINGS_LOADING_INDICATOR:
      prevState.updateVoteSettings = payload.loading;
      return { ...prevState };
    // Default
    default:
      return prevState;
  }
};
