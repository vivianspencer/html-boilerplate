const mix = require('laravel-mix');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
require('laravel-mix-favicon');
require('laravel-mix-ejs');

const home = require('./src/data/home');

const contents = {
    home,
    timestamp: Date.now()
};

mix
    .setPublicPath('dist')
    .js('src/js/script.js', 'dist/assets/js')
    .sass('src/scss/style.scss', 'dist/assets/css')
    .copy('resources/images/logo.svg', 'resources/favicon/logo.svg')
    .copyDirectory('resources/images', 'dist/assets/img')
    .ejs('src/views', 'dist', contents, { rmWhitespace: true, partials: 'src/views/partials' })
    .sourceMaps(true, 'source-map')
    .favicon({
        inputPath: 'resources/favicon',
        publicPath: 'dist',
        output: 'assets/img/favicon',
        blade: 'src/views/partials/favicon.ejs',
        reload: false,
        debug: true,
        configPath: './favicon.json'
    });

if (!mix.inProduction()) {
    mix.browserSync({
        watch: true,
        server: 'dist',
        proxy: null
    });
}
else {
    mix.webpackConfig({ plugins: [ new CleanWebpackPlugin(), new CompressionPlugin() ] })
        .options({
            cssNano: {
                discardComments: {
                    removeAll: true,
                },
            },
        });
}