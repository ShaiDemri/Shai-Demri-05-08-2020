import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

let finalCreateStore = compose(composeSetup(applyMiddleware(thunk)))(
  createStore
);

export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState);
}
