import { Provider } from "react-redux";
import Taro from "@tarojs/taro";
import store from "../store";
import { resetNum } from "../store/actions/count";
import { useEffect } from "react";
import "../app.scss";

const initAction = () => {
  const actions = Taro.getApp()?.actions;
  console.log("现在在sub", actions);
  if (actions.length > 0) {
    actions.forEach((action) => {
      store.dispatch(action);
    });
  }
  clearActions(actions);
};

const clearActions = (actions) => {
  actions.length = 0;
};

if (process.env.NODE_ENV !== "development") {
  const navigateTo = Taro.navigateTo;
  const redirectTo = Taro.redirectTo;
  const arr = ["/pages/index/index"];
  Taro.navigateTo = ({ url }) => {
    if (arr.findIndex((item) => item === url) !== -1) {
      navigateTo({
        url: `/main${url}`,
      });
    } else {
      navigateTo({
        url: `/sub${url}`,
      });
    }
  };
  Taro.redirectTo = ({ url }) => {
    redirectTo({
      url: `/sub${url}`,
    });
  };
}

const App = ({ children }) => {
  useEffect(() => {
    Taro.getApp()?.event.subscribe("toSub", () => {
      initAction();
    });
    Taro.getApp()?.event.subscribe("toWxPages", () => {
      store.dispatch(resetNum());
      clearActions(Taro.getApp().actions);
    });
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default App;
