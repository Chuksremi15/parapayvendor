import {
  LOGIN_FAILURE,
  ADD_CONTESTANT_FAILURE,
  AjaxError,
  SuccessResponse,
  GenericPayload,
  LOGIN_SUCCESS,
  ADD_CONTESTANT_SUCCESS,
  UPDATE_CONTESTANT_SUCCESS,
  GET_BANKS_FAILURE,
  GET_BANKS_SUCCESS,
  SAVE_WALLET_DETAILS_FAILURE,
  SAVE_WALLET_DETAILS_SUCCESS,
  GET_WALLET_DETAILS_FAILURE,
  GET_WALLET_DETAILS_SUCCESS,
  SET_WALLET_PIN_FAILURE,
  SET_WALLET_PIN_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_SUCCESS,
  UPDATE_EVICTION_SUCCESS,
  UPDATE_EVICTION_FAILURE,
  MANAGE_CONTESTANT_FAILURE,
  MANAGE_CONTESTANT_SUCCESS,
  CHANGE_EVICTION_STATUS_FAILURE,
  CHANGE_EVICTION_STATUS_SUCCESS,
  ADD_EVICTION_FAILURE,
  ADD_EVICTION_SUCCESS,
  GET_EVICTED_CONTESTANTS_FAILURE,
  UPDATE_VOTE_SETTINGS_FAILURE,
  UPDATE_VOTE_SETTINGS_SUCCESS,
} from "../../types";

export interface AjaxStatuses {
  errors: {
    [key: string]: string;
  };
  success: {
    [key: string]: string;
  };
}
const initialState: AjaxStatuses = {
  errors: {},
  success: {},
};

export const ajaxStatuses = (
  prevState: AjaxStatuses = initialState,
  { type, payload }: AjaxError & GenericPayload<SuccessResponse>
): AjaxStatuses => {
  switch (type) {
    // Auth Statuses
    case LOGIN_SUCCESS:
      console.log("login ajaxStatus", payload);
      prevState.success.login = payload.message;
      return { ...prevState };
    case ADD_CONTESTANT_SUCCESS:
      prevState.success.addContestant = payload.message;
      return { ...prevState };
    case UPDATE_CONTESTANT_SUCCESS:
      prevState.success.addContestant = payload.message;
      return { ...prevState };
    case LOGIN_FAILURE:
      prevState.errors.login = payload.error;
      return { ...prevState };
    case ADD_CONTESTANT_FAILURE:
      prevState.errors.addContestant = payload.error;
      return { ...prevState };

    case MANAGE_CONTESTANT_SUCCESS:
      prevState.success.manageContestant = payload.message;
      return { ...prevState };
    case MANAGE_CONTESTANT_FAILURE:
      prevState.errors.manageContestant = payload.error;
      return { ...prevState };

    // Misc
    case GET_BANKS_SUCCESS:
      prevState.success.getBanks = payload.message;
      return { ...prevState };
    case GET_BANKS_FAILURE:
      prevState.errors.getBanks = payload.error;
      return { ...prevState };
    // Wallet

    case SAVE_WALLET_DETAILS_SUCCESS:
      prevState.success.saveWalletDetails = payload.message;
      return { ...prevState };
    case SAVE_WALLET_DETAILS_FAILURE:
      prevState.errors.saveWalletDetails = payload.error;
      return { ...prevState };

    case GET_WALLET_DETAILS_SUCCESS:
      prevState.success.getWalletDetails = payload.message;
      return { ...prevState };
    case GET_WALLET_DETAILS_FAILURE:
      prevState.errors.getWalletDetails = payload.error;
      return { ...prevState };

    case SET_WALLET_PIN_SUCCESS:
      prevState.success.setWalletPin = payload.message;
      return { ...prevState };
    case SET_WALLET_PIN_FAILURE:
      prevState.errors.setWalletPin = payload.error;
      return { ...prevState };

    case WITHDRAWAL_SUCCESS:
      prevState.success.withdrawal = payload.message;
      return { ...prevState };
    case WITHDRAWAL_FAILURE:
      prevState.errors.updateEviction = payload.error;
      return { ...prevState };

    // Eviction
    case UPDATE_EVICTION_SUCCESS:
      prevState.success.updateEviction = payload.message;
      return { ...prevState };
    case UPDATE_EVICTION_FAILURE:
      prevState.errors.updateEviction = payload.error;
      return { ...prevState };

    case CHANGE_EVICTION_STATUS_SUCCESS:
      prevState.success.changeEvictionState = payload.message;
      return { ...prevState };
    case CHANGE_EVICTION_STATUS_FAILURE:
      prevState.errors.changeEvictionState = payload.error;
      return { ...prevState };

    case ADD_EVICTION_SUCCESS:
      prevState.success.addEviction = payload.message;
      return { ...prevState };
    case ADD_EVICTION_FAILURE:
      prevState.errors.addEviction = payload.error;
      return { ...prevState };
    case GET_EVICTED_CONTESTANTS_FAILURE:
      prevState.errors.evitedContestant = payload.error;
      return { ...prevState };

    //Settings

    case UPDATE_VOTE_SETTINGS_SUCCESS:
      prevState.success.updateVoteSettings = payload.message;
      return { ...prevState };
    case UPDATE_VOTE_SETTINGS_FAILURE:
      prevState.errors.updateVoteSettings = payload.error;
      return { ...prevState };
    default:
      return prevState;
  }
};
