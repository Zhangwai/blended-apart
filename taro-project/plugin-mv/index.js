const fs = require("fs-extra");
const path = require("path");

export default (ctx, options) => {
  ctx.onBuildFinish(() => {
    // Taro v3.1.4
    const blended = ctx.runOpts.blended || ctx.runOpts.options.blended;

    if (!blended) return;

    console.log("编译结束！");

    console.log(ctx.runOpts.env, ctx.runOpts.options.env, "环境");

    if (ctx.runOpts.env === "main" || ctx.runOpts.options.env === "main") {
      const rootPath = path.resolve(__dirname, "../..");
      const miniappPath = path.join(rootPath, "miniapp");
      const outputPath = path.resolve(__dirname, "../dist/main");
      const destPath = path.join(miniappPath, "main");

      if (fs.existsSync(destPath)) {
        fs.removeSync(destPath);
      }
      fs.copySync(outputPath, destPath);

      console.log("拷贝结束！");
      return;
    }
    if (ctx.runOpts.env === "sub" || ctx.runOpts.options.env === "sub") {
      const rootPath = path.resolve(__dirname, "../..");
      const miniappPath = path.join(rootPath, "miniapp");
      const outputPath = path.resolve(__dirname, "../dist/sub");
      const destPath = path.join(miniappPath, "sub");

      if (fs.existsSync(destPath)) {
        fs.removeSync(destPath);
      }
      fs.copySync(outputPath, destPath);

      console.log("拷贝结束！");
      return;
    }

    const rootPath = path.resolve(__dirname, "../..");
    const miniappPath = path.join(rootPath, "miniapp");
    const outputPath = path.resolve(__dirname, "../dist/production");
    const destPath = path.join(miniappPath, "production");

    if (fs.existsSync(destPath)) {
      fs.removeSync(destPath);
    }
    fs.copySync(outputPath, destPath);

    console.log("拷贝结束！");
  });
};
