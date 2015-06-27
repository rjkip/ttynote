var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return x !== '.bin';
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var config = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'ttynote.js'
    },
    node: {
        __dirname: true,
        __filename: true
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel?optional[]=es7.functionBind&optional[]=es7.objectRestSpread&optional[]=es7.trailingFunctionCommas'] },
        ]
    },
    externals: nodeModules,
    plugins: [
        new webpack.BannerPlugin('require("source-map-support").install();',
            { raw: true, entryOnly: false })
    ],
    devtool: 'source-map',
    debug: true
}

gulp.task('build', function(done) {
    webpack(config).run(function(err, stats) {
        err ? console.log('Error', err) : console.log("\n" + stats.toString() + "\n");
        done();
    });
});

gulp.task('run', ['build'], function(done) {
    require('child_process')
        .spawn('node', [path.join(__dirname, 'build/ttynote.js'), path.join(__dirname, 'examples/frp.md')], { stdio: 'inherit' })
        .on('close', function () { done(); });
});
