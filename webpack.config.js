var path = require("path");

module.exports = {
    entry: "./src/broadcaster.js",
    devtool: "cheap-module-source-map",
    output: {
        filename: "TrafficDispatch.js",
        path: path.resolve(__dirname, "build"),
        library: "TrafficDispatch",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    module: {
		loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /src.+\.js$/,
                exclude: /node_modules/,
                use: ["istanbul-instrumenter-loader", "babel-loader"]
            }
		]
	},
	resolve: {
		extensions: [".js", ".json"]
	}
};