import { combineReducers } from "redux";
import { authReducer as auth, AuthStore } from "./auth";
import { accountReducer as account, AccountStore } from "./account";
import { contestantReducer as contestant, ContestantStore } from "./contestant";
import { evictionReducer as eviction, EvictionStore } from "./eviction";
import {
  dashboardStartsReducer as dashboardStarts,
  DashboardStartsStore,
} from "./dashboardStarts";
import {
  voteSettingsReducer as voteSettings,
  VoteSettingsStore,
} from "./voteSettings";
import { miscReducer as misc, MiscStore } from "./misc";
import { walletReducer as wallet, WalletStore } from "./wallet";
import {
  loadingIndicatorsReducer as loadingIndicators,
  LoadingIndicators,
} from "./loadingIndicators";
import { ajaxStatuses, AjaxStatuses } from "./ajaxStatuses";
import {
  errorHandlerReducer as errorHandler,
  ErrorHandlerStore,
} from "./errorHandler";
import { persistReducer } from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

declare type AppState = {
  auth: AuthStore & PersistPartial;
  ajaxStatuses: AjaxStatuses;
  account: AccountStore;
  loadingIndicators: LoadingIndicators;
  errorHandler: ErrorHandlerStore;
  contestant: ContestantStore;
  eviction: EvictionStore;
  voteSettings: VoteSettingsStore;

  dashboardStarts: DashboardStartsStore;
  misc: MiscStore;
  wallet: WalletStore;
};

const allReducers = combineReducers<AppState>({
  auth: persistReducer(authPersistConfig, auth),
  ajaxStatuses,
  account,
  loadingIndicators,
  errorHandler,
  contestant,
  eviction,
  voteSettings,
  dashboardStarts,
  misc,
  wallet,
});

export default allReducers;
