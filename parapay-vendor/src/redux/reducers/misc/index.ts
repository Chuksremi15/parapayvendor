import { MiscActions, BankProps, GET_BANKS_SUCCESS } from "../../types";

export type MiscStore = {
  banks: BankProps[];
};

const initialState = (): MiscStore => ({
  banks: [],
});

export const miscReducer = (
  prevState: MiscStore = initialState(),
  { type, payload }: MiscActions
): MiscStore => {
  switch (type) {
    case GET_BANKS_SUCCESS:
      return {
        ...prevState,
        banks: payload.banklist,
      };
    default:
      return prevState;
  }
};
