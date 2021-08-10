import {
  ContestantsProps,
  ContestantActions,
  GET_CONTESTANTS_SUCCESS,
  ADD_CONTESTANT_SUCCESS,
  GET_CONTESTANT_SUCCESS,
  UPDATE_CONTESTANT_SUCCESS,
  MANAGE_CONTESTANT_SUCCESS,
  GET_EVICTED_CONTESTANTS_SUCCESS,
} from "../../types";

export type ContestantStore = {
  contestants: ContestantsProps[];
  contestant?: ContestantsProps;
  contestantLoading: boolean;
  contestantsLoading: boolean;
};

const initialState = (): ContestantStore => ({
  contestants: [],
  contestantLoading: true,
  contestantsLoading: true,
});

export const contestantReducer = (
  prevState: ContestantStore = initialState(),
  { type, payload }: ContestantActions
): ContestantStore => {
  switch (type) {
    case GET_CONTESTANTS_SUCCESS:
      return {
        ...prevState,
        contestants: payload.contestants,
        contestantsLoading: false,
      };
    case GET_EVICTED_CONTESTANTS_SUCCESS:
      return {
        ...prevState,
        contestants: payload.contestants,
      };
    case ADD_CONTESTANT_SUCCESS:
      prevState.contestant = payload.contestant;
      return { ...prevState };
    case UPDATE_CONTESTANT_SUCCESS:
    case MANAGE_CONTESTANT_SUCCESS:
      prevState.contestant = payload.contestant;
      return { ...prevState };
    case GET_CONTESTANT_SUCCESS:
      prevState.contestant = payload.contestant;
      prevState.contestantLoading = false;
      return { ...prevState };
    default:
      return prevState;
  }
};
