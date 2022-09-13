const path = require("path");

const config = {
  projectName: "test",
  date: "2021-1-18",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.NODE_ENV}`,
  plugins: [
    path.join(process.cwd(), "/plugin-mv/index.js"),
    "@tarojs/plugin-indie",
  ],
  framework: "react",
  mini: {
    enableSourceMap: false,
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    webpackChain: (chain, webpack) => {
      chain.merge({
        output: {
          // 可以配合 npm script 和环境变量来动态修改
          jsonpFunction: process.env.JSONP_NAME || "webpackJsonp",
        },
      });
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  alias: {
    '@/store': path.resolve(__dirname, '..', 'src/store'),
  },
};

module.exports = function(merge) {
  console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  if (process.env.NODE_ENV === "sub") {
    return merge({}, config, require("./sub"));
  }
  if (process.env.NODE_ENV === "main") {
    return merge({}, config, require("./main"));
  }
  return merge({}, config, require("./prod"));
};
