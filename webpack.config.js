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
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	}
};