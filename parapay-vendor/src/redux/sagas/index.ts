import { spawn } from "redux-saga/effects";
import authSagas from "./auth";
import contestantManagementSagas from "./contestant";
import evictionManagementSagas from "./eviction";
import voteSettingsSagas from "./voteSettings";
import dashboardStartsSagas from "./dashboardStarts";
import miscSagas from "./misc";
import walletManagementSagas from "./wallet";

export default function* rootSaga() {
  yield spawn(authSagas);
  yield spawn(contestantManagementSagas);
  yield spawn(evictionManagementSagas);
  yield spawn(voteSettingsSagas);
  yield spawn(dashboardStartsSagas);
  yield spawn(miscSagas);
  yield spawn(walletManagementSagas);
}
