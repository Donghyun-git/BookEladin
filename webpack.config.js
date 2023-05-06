const path = require("path");

module.exports = {
    mode: "development",
    experiments: {
        topLevelAwait: true,
    },
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
