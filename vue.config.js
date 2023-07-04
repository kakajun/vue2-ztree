module.exports = {
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === "production" ? "/vue2-ztree/" : "/",
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    config.set("externals", {
      jquery: "jQuery",
    });
  },
};
