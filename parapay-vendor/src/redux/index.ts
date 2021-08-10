import { createStore, applyMiddleware, AnyAction } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import rootSaga from "./sagas";
import allReducers from "./reducers";
export * from "./types";
export * from "./actions";
const sagaMiddleWare = createSagaMiddleware();

export type AppState = ReturnType<typeof allReducers>;
export const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);
export const persistor = persistStore(store);
sagaMiddleWare.run(rootSaga);
