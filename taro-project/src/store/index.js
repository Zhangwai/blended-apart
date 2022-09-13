import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import Taro from "@tarojs/taro";
import rootReducer from "./reducers";

// 收集action存储到全局
const collectActions = (store) => (next) => (action) => {
  console.log("dispatching", Taro.getApp()?.actions, action);
  if (["ADD"].includes(action.type)) {
    // 维护最新的action历史使用记录;类似自增功能需要添加到数组中实现一直增加
    Taro.getApp()?.actions.push(action);
  } else {
    // 类似替换状态功能若actions中不存在则直接push到actions最后，否则就删除之前的action再将新的action添加到actions末尾
    const index = Taro.getApp()?.actions.findIndex(
      (item) => item.type === action.type
    );
    if (index !== -1) {
      Taro.getApp()?.actions.splice(index, 1);
    }
    Taro.getApp()?.actions.push(action);
  }

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
