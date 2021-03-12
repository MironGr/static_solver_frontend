const path = require('path')
// модуль для назначения шаблона html
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// модуль для экспорта файлов css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// модули для оптимизации css и js
const OptCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// для map
// const { SourceMapDevToolPlugin } = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new OptCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config 
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
	context: path.resolve(__dirname, 'src'),
	// режим разработки
	mode: 'development',
	entry: {
		//точки входа [name]
		main: ['@babel/polyfill', './front/indexFront.ts']
		//service: './service.ts'
	},
	output: {
		// паттерн имени выходных файлов
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		// расширения, которые можно не указывать
		extensions: ['.js', '.json', '.ts'],
		// асболютные пути
		/*alias: {
			'@models': path.resolve(__dirname, 'src/models'),
			'@': path.resolve(__dirname, 'src'),
		}*/
	},
	// оптимизация
	optimization: optimization(),
	// порт для webpack-dev-server для автоперезапуска
	devServer: {
		port: 4200,
		hot: isDev
	},
	plugins: [
		// для указания шаблона html файла
		new HTMLWebpackPlugin({
			template: './front/index.html',
			minify: {
				// для оптимизации html для продакшена
				collapseWhitespace: isProd
			}
		}),
		// очистка пути аутпута от предыдущих сборок
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})/*,
		new SourceMapDevToolPlugin({
			filename: '[file].map'
		})*/
	],
	module: {
		// правила обработки файлов с различными расширениями
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							//hmr: isDev,
							//reloadAll: true,
							publicPath: ''							
						},
					}, 'css-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.m?js$/,
		        exclude: /node_modules/,
		        use: {
		          loader: "babel-loader",
		          options: {
		            presets: [
		            	'@babel/preset-env'
		            	]
					}
				}
			},
			{
				test: /\.m?ts$/,
		        exclude: /node_modules/,
		        use: {
		          loader: "babel-loader",
		          options: {
		            presets: [
			            '@babel/preset-env',
			            '@babel/preset-typescript'
		            	]
					}
				}
			}
		]
	}
}