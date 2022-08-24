import path from "path";

module.exports = {
  env: {
    NODE_ENV: '"main"',
  },
  defineConstants: {},
  mini: {
    entry: {
      app: [`${path.join(process.cwd(), "src/appConfig/main")}`],
    },
    webpackChain: (chain, webpack) => {
      chain.merge({
        output: {
          // 可以配合 npm script 和环境变量来动态修改
          jsonpFunction: process.env.JSONP_NAME || "webpackJsonpMain",
        },
      });
    },
  },
  h5: {},
};
