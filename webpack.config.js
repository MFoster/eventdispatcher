module.exports = {
    entry: "./src/broadcaster.js",
    module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader"
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"]
	}
};