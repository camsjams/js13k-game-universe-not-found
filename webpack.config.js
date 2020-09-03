const {join} = require('path');
const packageJson = require('./package.json');
const reduceWebpack = require('reduce-webpack').default;

const config = reduceWebpack(
	{
	},
	packageJson.version,
	__dirname
);

if (process.env.NODE_ENV !== 'production') {
	config.devServer = (() => ({
		contentBase: join(__dirname, 'dist'),
		host: '0.0.0.0',
		port: 8143,
		hotOnly: true,
		inline: true,
		publicPath: '/'
	}))();
}

config.entry.app = ['./src/index.ts'];

module.exports = config;
