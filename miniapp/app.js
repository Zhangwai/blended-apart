const myevent = require("./utils/event");
// app.js
App({
  // 存储actions
  actions: [],
  event: new myevent(),

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });

    wx.onAppRoute((res) => {
      console.log(this.globalData.oldRoutePath, res, "路由监听");
      const oldPath = `${this.globalData.oldRoutePath.path}`;
      const newPath = `${res.path}`;
      const oldPathSign = oldPath.split("/")[0];
      const newPathSign = newPath.split("/")[0];

      console.log(oldPathSign, newPathSign);
      // 具体项目具体分析，我们的原生项目和taro项目是完全没有关联的两个项目，
      // 所以只在分包内部跳转到另一个分包的时候同步redux
      if (
        oldPathSign !== newPathSign &&
        newPathSign == "sub" &&
        oldPathSign !== "pages"
      ) {
        console.log("未知->sub");
        this.event.publish("toSub");
      }
      if (
        oldPathSign !== newPathSign &&
        newPathSign == "main" &&
        oldPathSign !== "pages"
      ) {
        console.log("未知->main");
        this.event.publish("toMain");
      }
      if (oldPathSign !== newPathSign && newPathSign == "pages") {
        console.log("未知->wxPages");
        this.event.publish("toWxPages");
      }
      this.globalData.oldRoutePath = res;
    });
  },

  globalData: {
    userInfo: null,
    // 旧路由
    oldRoutePath: "",
  },
});
