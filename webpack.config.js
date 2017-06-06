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
                },
                // instrument only testing sources with Istanbul
                {
                    test: /\.js$/,
                    include: path.resolve("src/"),
                    loader: "istanbul-instrumenter-loader"
                }
            ]
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"]
	}
};