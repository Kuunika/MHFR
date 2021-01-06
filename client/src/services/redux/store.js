import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import promiseMiddleware from "redux-promise-middleware";
import { createLogger } from "redux-logger";
import errorMiddleware from "./errorMiddleware";

// const middleware = compose(applyMiddleware(errorMiddleware,promiseMiddleware));
const middleware = compose(
  applyMiddleware(
    errorMiddleware,
    promiseMiddleware,
    createLogger({ collapsed: true })
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const Store = createStore(rootReducer, middleware);

export default Store;
