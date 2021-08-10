import {
  GET_EVICTIONS_SUCCESS,
  ADD_EVICTION_SUCCESS,
  UPDATE_EVICTION_SUCCESS,
  CHANGE_EVICTION_STATUS_SUCCESS,
  GET_EVICTION_SUCCESS,
  EvictionProps,
  EvictionActions,
} from "../../types";

export type EvictionStore = {
  evictions: EvictionProps[];
  eviction?: EvictionProps;
  evictionLoading: boolean;
  evictionsLoading: boolean;
};

const initialState = (): EvictionStore => ({
  evictions: [],
  evictionLoading: true,
  evictionsLoading: true,
});

export const evictionReducer = (
  prevState: EvictionStore = initialState(),
  { type, payload }: EvictionActions
): EvictionStore => {
  switch (type) {
    case GET_EVICTIONS_SUCCESS:
      return {
        ...prevState,
        evictions: payload.evictions,
        evictionsLoading: false,
      };
    case ADD_EVICTION_SUCCESS:
      prevState.eviction = payload.eviction;
      return { ...prevState };
    case UPDATE_EVICTION_SUCCESS:
      prevState.eviction = { ...prevState.eviction, ...payload.eviction };
      return { ...prevState };
    case GET_EVICTION_SUCCESS:
      prevState.eviction = payload.eviction;
      prevState.evictionLoading = false;
      return { ...prevState };
    case CHANGE_EVICTION_STATUS_SUCCESS:
      return { ...prevState };

    default:
      return prevState;
  }
};
