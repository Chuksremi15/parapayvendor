import {
  VoteSettingsActions,
  GET_VOTE_SETTINGS_SUCCESS,
  UPDATE_VOTE_SETTINGS_SUCCESS,
  VoteSettingsProps,
} from "../../types";

export type VoteSettingsStore = {
  vote_settings?: VoteSettingsProps;
};

const initialState = (): VoteSettingsStore => ({});

export const voteSettingsReducer = (
  prevState: VoteSettingsStore = initialState(),
  { type, payload }: VoteSettingsActions
): VoteSettingsStore => {
  switch (type) {
    case GET_VOTE_SETTINGS_SUCCESS:
      return {
        ...prevState,
        vote_settings: payload.vote_settings,
      };
    case UPDATE_VOTE_SETTINGS_SUCCESS:
      prevState.vote_settings = payload.vote_settings;
      return { ...prevState };
    default:
      return prevState;
  }
};
