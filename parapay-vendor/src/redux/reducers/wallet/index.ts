import {
  WalletDetailsProps,
  WalletActions,
  GET_WALLET_DETAILS_SUCCESS,
} from "../../types";

export type WalletStore = {
  walletDetails?: WalletDetailsProps;
};

const initialState = (): WalletStore => ({});

export const walletReducer = (
  prevState: WalletStore = initialState(),
  { type, payload }: WalletActions
): WalletStore => {
  switch (type) {
    case GET_WALLET_DETAILS_SUCCESS:
      return {
        ...prevState,
        walletDetails: payload.vendor_wallet,
      };
    default:
      return prevState;
  }
};
