const http = require('http');
const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');
const app = express();
const API_SERVER='http://192.168.10.10/api';
var path = require('path');

const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
};

app.use(require('morgan')('short'));


app.use('/api', proxy(API_SERVER));


(function initWebpack() {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config.js')['development'];
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, webpackConfig.devServer));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr', heartbeat: 10 * 1000,
        stats:{
            progress:true,
            colors: true}
    }));

    app.use(express.static(PATHS.build));
})();

app.get(/.*/, function root(req, res) {
    res.sendFile(PATHS.app+'index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
    const address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
});
