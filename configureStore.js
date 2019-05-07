import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import auth from "@tenderplan3/store/modules/auth";
import keys from "@tenderplan3/store/modules/keys";
import marks from "@tenderplan3/store/modules/marks";
import info from "@tenderplan3/store/modules/info";
import clientMiddleware from "./clientMiddleware";

const createReducer = (injectedReducers = {}) => {
  const combinedReducers = combineReducers({
    ...injectedReducers
  });

  return combinedReducers;
};

export default function configureStore(initialState = {}, client) {
  const middlewares = [
    thunk,
    clientMiddleware(client),
    createLogger({
      titleFormatter: (action, time, took) =>
        `action @ ${action.type || action.types[0]} ${time} (in ${took.toFixed(
          2
        )} ms)`
    })
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  // const composeEnhancers =
  //   process.env.NODE_ENV !== "production" &&
  //   typeof window === "object" &&
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  //     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  //     : compose;
  /* eslint-enable */

  const initialReducers = {
    auth,
    keys,
    marks,
    info
  };

  const store = createStore(
    createReducer(initialReducers),
    initialState,
    compose(...enhancers)
    // composeEnhancers(...enhancers)
  );

  // Extensions
  store.injectedReducers = initialReducers; // Reducer registry
  console.log("STORE", store.getState());
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
