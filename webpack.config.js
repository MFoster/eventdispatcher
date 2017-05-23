module.exports = {
    entry: ['babel-polyfill', './src/broadcaster.js'],
    devtool: "source-map",
    module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'react']
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	}
};