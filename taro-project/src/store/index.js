import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import Taro from "@tarojs/taro";
import rootReducer from "./reducers";

// 收集action存储到全局
const collectActions = (store) => (next) => (action) => {
  console.log("dispatching", Taro.getApp()?.actions, action);

  // const index = Taro.getApp()?.actions.findIndex(
  //   (item) => item.type === action.type
  // );
  // if (index !== -1) {
  //   Taro.getApp()?.actions.splice(index, 1, action);
  // } else {
  //   Taro.getApp()?.actions.push(action);
  // }

  // 维护最新的action历史使用记录
  Taro.getApp()?.actions.push(action);
  const res = next(action);
  return res;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const middleWares = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  // middleWares.push(require('redux-logger').createLogger());
}

if (process.env.NODE_ENV !== "development") {
  // middleWares.push(require('redux-logger').createLogger());
  middleWares.push(collectActions);
}

const enhancer = composeEnhancers(
  applyMiddleware(...middleWares)
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

export default store;
